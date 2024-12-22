// import React from "react";
// import { auth, provider, signInWithPopup } from '../auth/firebase'

// const LoginPage = ({ setUser }) => {
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       setUser(result.user);
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="p-8 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         <button
//           className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
//           onClick={handleGoogleLogin}
//         >
//           Login with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../auth/firebase";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const result = isSignUp
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      console.error("Error during email/password login:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg w-80">
        <h2 className="text-2xl font-bold mb-4">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleEmailPasswordLogin}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 mb-4"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <button
          className="w-full py-2 px-4 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 mb-4"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
        <p className="text-center text-sm text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
