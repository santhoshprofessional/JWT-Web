import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
interface ChatMessage {
  text: string;
  senderType: "me" | "other" | "system";
}
const PrivateChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });
    socket.emit("joinRoom", { room: "user-1" });
    socket.on("message-to-room", (data) => {
      const isSelf = data.sender === socket.id;
      console.log("Private Message:", data);
      setMessages((prev) => [
        ...prev,
        { text: data?.message, senderType: isSelf ? "me" : "other" },
      ]);
    });
  }, []);
  return (
    <div>
      <h3 className="text-center text-2xl mt-10">PrivateChat</h3>
      <div
        ref={containerRef}
        className="w-[500px] h-[500px] border rounded-2xl overflow-y-auto p-4 flex flex-col gap-2 bg-gray-50"
      >
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderType === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                msg.senderType === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-5">
        <input
          className="border border-gray-300 rounded-md px-3 py-2"
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          onClick={() => {
            if (!message) return;
            socket.emit("sendMessageToRoom", {
              room: "user-1",
              message,
            });
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PrivateChat;
