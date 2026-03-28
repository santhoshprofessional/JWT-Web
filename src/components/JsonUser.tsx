import React from "react";
import { useSelector } from "react-redux";

export default React.memo(function JsonUser({ staticValues }: any) {
  const user = useSelector((state: any) => state.jsonUser.users);

  console.log("user", user);
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h3 className="text-center text-2xl mt-10">{staticValues?.redux}</h3>
      {user?.map((user: any) => {
        return (
          <div
            key={user?.id}
            className="flex gap-5 items-center justify-center mt-3"
          >
            <p className="text-cyan-500">{user?.name}</p>
            <p className="text-pink-500">{user?.email}</p>
          </div>
        );
      })}
    </div>
  );
});
