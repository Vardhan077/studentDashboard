// import "tailwindcss/tailwind.css";
// const Navbar = () => (
//   <div className="flex justify-between items-center p-4 bg-white border-b">
//     <input
//       type="text"
//       placeholder="Search your course"
//       className="border rounded px-4 py-2 w-1/3"
//     />
//     <div className="flex items-center space-x-4">
//       <button className="relative">
//         <span className="material-icons">notifications</span>
//       </button>
//       <img
//         src="https://via.placeholder.com/40"
//         alt="User Profile"
//         className="rounded-full w-10 h-10"
//       />
//       <p>Adeline H. Dancy</p>
//     </div>
//   </div>
// );


// export default Navbar
import React from "react";
import { signOut ,auth} from "../auth/firebase";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const pic = auth?.currentUser?.photoURL
  const email = auth?.currentUser?.email.split("@")[0]

  console.log(pic,"profile",email)

  return (
    <nav className="p-4 bg-#f6f8fa text-black flex justify-between items-center">
      <h1 className="text-xl font-bold">Student Management</h1>
      <div className="flex items-center space-x-4">
      
      <img
        src={pic ? `${pic}` : "https://res.cloudinary.com/dg9itycrz/image/upload/v1734767663/avatar_i8vrav.png" }
        alt="User Profile"
        className="rounded-full w-10 h-10"
      />
      <p>{email}</p>
      </div>
      <button
        className="py-2 px-4 bg-red-500 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
