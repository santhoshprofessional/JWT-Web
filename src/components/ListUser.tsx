// const ListUser = ({ userData, handleDeleteUser }: any) => {
//   return (
//     <>
//       {userData?.map((user: any) => {
//         return (
//           <div
//             className="flex items-center justify-between shadow gap-3 mx-auto p-2"
//             key={user._id}
//           >
//             <p className="text-green-500">{user?.userName}</p>
//             <p className="text-blue-500">{user?.email}</p>
//             <button
//               className="text-red-500 border rounded-md p-1 w-fit"
//               onClick={() => handleDeleteUser(user?._id)}
//             >
//               Delete user
//             </button>
//           </div>
//         );
//       })}
//     </>
//   );
// };
// export default React.memo(ListUser);

// import React from "react";
// function ListUser({ userData, handleDeleteUser }: any) {
//   return (
//     <>
//       {userData?.map((user: any) => {
//         return (
//           <div
//             className="flex items-center justify-between shadow gap-3 mx-auto p-2"
//             key={user._id}
//           >
//             <p className="text-green-500">{user?.userName}</p>
//             <p className="text-blue-500">{user?.email}</p>
//             <button
//               className="text-red-500 border rounded-md p-1 w-fit"
//               onClick={() => handleDeleteUser(user?._id)}
//             >
//               Delete user
//             </button>
//           </div>
//         );
//       })}
//     </>
//   );
// }
// export default React.memo(ListUser);

//Inline React.memo
import React from "react";
import { useNavigate } from "react-router-dom";
export default React.memo(function ListUser({
  userData,
  handleDeleteUser,
  staticValues,
}: any) {
  console.log("list rendered");
  const navigation = useNavigate();
  return (
    <>
      <h3 className="text-center text-2xl">{staticValues?.props}</h3>
      {userData?.map((user: any) => {
        return (
          <div
            className="flex items-center justify-between shadow gap-3 mx-auto p-2"
            key={user._id}
            onClick={() => navigation(`/details/${user.userName}`)}
          >
            <p className="text-green-500">{user?.userName}</p>
            <p className="text-blue-500">{user?.email}</p>
            <button
              className="text-red-500 border rounded-md p-1 w-fit"
              onClick={() => handleDeleteUser(user?._id)}
            >
              Delete user
            </button>
          </div>
        );
      })}
    </>
  );
});
