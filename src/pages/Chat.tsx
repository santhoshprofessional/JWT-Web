import { useEffect, useState, useRef, lazy } from "react";
import { socket } from "../socket";

interface ChatMessage {
  text: string;
  senderType: "me" | "other" | "system";
  sender?: string;
}
const PrivateChat = lazy(() => import("../components/PrivateChat"));
const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // socket.connect();

    // socket.off("user-joined");
    // socket.off("user-left");
    // socket.off("broadcast");

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("user-joined", (data) => {
      setMessages((prev) => [
        ...prev,
        { text: data.message, senderType: "system" },
      ]);
    });

    socket.on("user-left", (data) => {
      setMessages((prev) => [
        ...prev,
        { text: data.message, senderType: "system" },
      ]);
    });

    socket.on("broadcast", (data) => {
      const isSelf = data.sender === socket.id;
      setMessages((prev) => [
        ...prev,
        {
          text: data.message,
          senderType: isSelf ? "me" : "other",
          sender: isSelf ? "You" : data.sender,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div className="flex flex-col gap-5 items-center p-5">
      <h1 className="text-2xl font-bold">Chat</h1>

      <div
        ref={chatContainerRef}
        className="w-[500px] h-[500px] border rounded-2xl overflow-y-auto p-4 flex flex-col gap-2 bg-gray-50"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`px-3 py-2 rounded-md shadow max-w-[80%] flex flex-col ${
              msg.senderType === "me"
                ? "bg-blue-500 text-white self-end rounded-br-none"
                : msg.senderType === "other"
                  ? "bg-white text-black self-start rounded-bl-none"
                  : "bg-gray-200 text-gray-500 text-sm self-center shadow-none text-center"
            }`}
          >
            {msg.senderType !== "system" && (
              <span className="text-xs font-bold mb-1 opacity-75">
                {msg.sender}
              </span>
            )}
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          className="border px-3 py-1 rounded w-[300px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
      <PrivateChat />
    </div>
  );
};

export default Chat;
