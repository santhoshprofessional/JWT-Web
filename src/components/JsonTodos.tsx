import React, { useContext } from "react";
import { TodosContext } from "../store/TodosContext";

const JsonTodos = ({ staticValues }: any) => {
  const todos = useContext(TodosContext);
  console.log("todos", todos);
  return (
    <div>
      <h3 className="text-center text-2xl mt-10">{staticValues?.context}</h3>
      {todos?.slice(0, 10)?.map((todo: any) => {
        return (
          <div
            className="flex gap-5 items-center justify-center mt-3"
            key={todo?.id}
          >
            <p className="text-yellow-300">{todo?.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(JsonTodos);
