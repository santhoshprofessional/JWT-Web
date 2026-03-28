import React, { useReducer, useState } from "react";
const initialState = {
  data: [],
  editId: null,
};
function reducer(state: any, action: any) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        data: [...state.data, { id: Date.now(), text: action.payload }],
      };
    case "delete":
      return {
        ...state,
        data: state.data?.filter((item: any) => item.id !== action.payload),
      };
    case "edit":
      return {
        ...state,
        editId: action.payload,
      };
    case "update":
      return {
        ...state,
        data: state.data.map((item: any) =>
          item.id === state.editId ? { ...item, text: action.payload } : item,
        ),
        editId: null,
      };
    default:
      return state;
  }
}
const CrudReducer = ({ staticValues }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");

  return (
    <div className="">
      <h3 className="text-center text-2xl mt-10">{staticValues?.reducer}</h3>
      <div className="flex items-center justify-center gap-5">
        <input
          className="border border-gray-300 rounded-md px-3 py-2"
          type="text"
          placeholder="Enter value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          onClick={() => {
            if (!input) return;
            if (state.editId) {
              dispatch({
                type: "update",
                payload: input,
              });
            } else {
              dispatch({ type: "add", payload: input });
            }
            setInput("");
          }}
        >
          {state.editId ? "Update" : "Add"}
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        {state.data.map((item: any) => {
          return (
            <div
              key={item.id}
              className="flex gap-5 items-center justify-center mt-3"
            >
              <p> {item?.text}</p>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                onClick={() => dispatch({ type: "delete", payload: item.id })}
              >
                Delete
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                onClick={() => {
                  dispatch({ type: "edit", payload: item.id });
                  setInput(item.text);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(CrudReducer);
