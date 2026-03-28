import React from "react";

export default React.memo(function Counter({
  count,
  increment,
  decrement,
  staticValues,
}: any) {
  console.log("count rendered");

  return (
    <>
      <h3 className="text-center text-2xl mt-10">{staticValues?.reactMemo}</h3>
      <div className="flex gap-5 items-center justify-center mt-3">
        <button
          className="border border-green-500 rounded-md text-green-500 p-1"
          onClick={increment}
        >
          Increment
        </button>
        <p className="text-xl text-indigo-500">{count}</p>
        <button
          className="border border-red-500 rounded-md text-red-500 p-1"
          onClick={decrement}
        >
          Decrement
        </button>
      </div>
    </>
  );
});
