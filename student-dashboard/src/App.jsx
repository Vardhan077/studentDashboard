// import Sidebar from './components/Sidebar'
// import StudentTable from './components/StudentTable.jsx'
// import Navbar from './components/Navbar.jsx'
// import "tailwindcss/tailwind.css";

// const App = () => (
//   <div className="flex">

//     <Sidebar />
//     <div className="flex-grow">
//       <Navbar />
//       <StudentTable />
//     </div>
//   </div>
// );

// export default App;

import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./auth/firebase";
import Sidebar from "./components/Sidebar";
import StudentTable from "./components/StudentTable";
import Navbar from "./components/Navbar";
import LoginPage from './components/Login'
import "tailwindcss/tailwind.css";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return user ? (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Navbar />
        <StudentTable />
      </div>
    </div>
  ) : (
    <LoginPage setUser={setUser} />
  );
};

export default App;
