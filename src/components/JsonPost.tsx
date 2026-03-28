import React from "react";
import useJsonPostStore from "../store/JsonPost.store";

const JsonPost = ({ staticValues }: any) => {
  const { jsonPost } = useJsonPostStore();
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h3 className="text-center text-2xl mt-10">{staticValues?.zustand}</h3>
      {jsonPost?.slice(0, 10)?.map((post: any) => {
        return (
          <div
            className="flex gap-5 items-center justify-center mt-3"
            key={post?.id}
          >
            <p className="text-amber-500">{post?.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(JsonPost);
