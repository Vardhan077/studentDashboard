import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector, useDispatch } from "react-redux";
import "tailwindcss/tailwind.css";
import supabase from "../services/supabaseClient";
import { setStudents,addStudent, updateStudent, deleteStudent  } from "../redux/store";
import axios from "axios";

// const Modal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
//     const [formData, setFormData] = useState({
//     name: "",
//     cohort: "",
//     courses: "",
//     dateJoined: "",
//     lastLogin: "",
//     ...initialData,
//   });

//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       ...initialData,
//     }));
//   }, [initialData]);

//   console.log("forrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmm", formData)
//   console.log("Initial Data:", initialData, "ID:", initialData?.id || "UNKNOWNWN");


//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({...formData, id: initialData.id });
//     console.log(formData,"if form faya")
//     setFormData({
//       name: "",
//       cohort: "",
//       courses: "",
//       dateJoined: "",
//       lastLogin: "",
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//         <h2 className="text-xl font-bold mb-4">
//           {initialData?.id ? "Update Student" : "Add Student"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="cohort"
//             placeholder="Cohort"
//             value={formData.cohort}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             name="courses"
//             placeholder="Courses"
//             value={formData.courses}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded"
//             required
//           />
//           <input
//             type="date"
//             name="dateJoined"
//             value={formData.dateJoined}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded"
//             required
//           />
//           <input
//             type="date"
//             name="lastLogin"
//             value={formData.lastLogin}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded"
//             required
//           />
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               {initialData.id ? "Update" : "Add"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

const Modal = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    cohort: "",
    courses: "",
    dateJoined: "",
    lastLogin: "",
    ...initialData, // Safe because default is now {}
  });

  console.log("Initial Data:", initialData, "ID:", initialData?.id || "UNKNOWN");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: initialData?.id  });
    setFormData({
      name: "",
      cohort: "",
      courses: "",
      dateJoined: "",
      lastLogin: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {initialData?.id ? "Update Student" : "Add Student"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            name="cohort"
            placeholder="Cohort"
            value={formData.cohort}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            name="courses"
            placeholder="Courses"
            value={formData.courses}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="date"
            name="dateJoined"
            value={formData.dateJoined}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="date"
            name="lastLogin"
            value={formData.lastLogin}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {initialData?.id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const StudentTable = () => {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

 

useEffect(() => {
  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://dashboard-backend-b9tl.vercel.app/students");
      dispatch(setStudents(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  fetchStudents();
}, [dispatch]);

const handleAddStudent = async (newStudent) => {
  try {
    const response = await axios.post("https://dashboard-backend-b9tl.vercel.app/students", newStudent);
    dispatch(addStudent(response.data));
  } catch (error) {
    console.error(error);
  }
  setModalOpen(false);
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`https://dashboard-backend-b9tl.vercel.app/students/${id}`);
    dispatch(deleteStudent(id));
  } catch (error) {
    console.error(error);
  }
};

const handleUpdateStudent = async (uStudent) => {
  const { id, ...dataToUpdate } = uStudent;

  if (!id) {
    console.error("Student ID is missing!");
    return;
  }

  try {
    const response = await fetch(`https://dashboard-backend-b9tl.vercel.app/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error updating student:", error);
      return;
    }

    const updatedStudent = await response.json();
    console.log("Updated student:", updatedStudent);

    // Assuming `dispatch` is available
    dispatch(updateStudent(updatedStudent));
    setModalOpen(false);
  } catch (error) {
    console.error("Failed to update student:", error);
  }
};


  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     const { data, error } = await supabase.from("students").select();
  //     if (error) {
  //       console.error(error);
  //     }
  //     dispatch(setStudents(data || []));
  //   };
  //   fetchStudents();
  // }, [dispatch]);

  // const handleDelete = async (id) => {
  //   await supabase.from("students").delete().eq("id", id);
  //   dispatch(deleteStudent(id));
  // };

  // const handleAddStudent = async (newStudent) => {
  //   const { data, error } = await supabase
  //     .from("students")
  //     .insert([newStudent])
  //     .select();

  //   if (error) {
  //     console.error(error);
  //   } else {
  //     dispatch(addStudent(data[0]));
  //   }
  //   setModalOpen(false);
  // };

  // const handleUpdateStudent = async (uStudent) => {
  //   const { id, ...dataToUpdate } = uStudent;
  //   const { error } = await supabase
  //     .from("students")
  //     .update(dataToUpdate)
  //     .eq("id", id);

  //     console.log(id,"updated",uStudent)


  //     if (!id) {
  //       console.error("Student ID is missing!");
  //       return;
  //     }
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     dispatch(updateStudent(uStudent));
  //   }
  //   setModalOpen(false);
  // };

  return (
    <div className="p-6 w-full">
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 bg-gray-200 rounded">AY 2024-25</button>
        <button className="px-4 py-2 bg-gray-200 rounded">CBSE 9</button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            setModalData(null);
            setModalOpen(true);
          }}
        >
          Add Student
        </button>
      </div>
      <table className="table-auto w-full bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Student Name</th>
            <th className="border px-4 py-2 text-left">Cohort</th>
            <th className="border px-4 py-2 text-left">Courses</th>
            <th className="border px-4 py-2 text-left">Date Joined</th>
            <th className="border px-4 py-2 text-left">Last Login</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.cohort}</td>
              <td className="border px-4 py-2">{student.courses}</td>
              <td className="border px-4 py-2">{student.dateJoined}</td>
              <td className="border px-4 py-2">{student.lastLogin}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="text-blue-500"
                  onClick={() => {
                    setModalData(student);
                    setModalOpen(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={modalData ? handleUpdateStudent : handleAddStudent}
        initialData={modalData}
      />
      
    </div>
  );
};

export default StudentTable