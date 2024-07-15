import ConfirmationDialog from "@/components/ui/ConfirmationDialogue";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { IoMdPersonAdd } from "react-icons/io";
import { toast } from "react-toastify";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [editedStudent, setEditedStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
  });
  const [addMode, setAddMode] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
  });
  const [{ auth }] = useCookies(["auth"]);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/user", {
          method: "GET",
          headers: {
            Authorization: auth,
          },
        });
        const data = await response.json();
        console.log("data", data);
        setStudents(data.userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [auth, editMode, addMode]);

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setEditedStudent(student);
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setEditedStudent({ ...editedStudent, [name]: value });
    } else {
      setNewStudent({ ...newStudent, [name]: value });
    }
  };

  const handleDelete = async (student) => {
    try {
      await axios.delete(`http://localhost:4000/api/auth/user/${student._id}`);
      toast("Student deleted successfully");
      setStudents(students.filter((s) => s._id !== student._id));
    } catch (err) {
      console.log(err);
    }
    setEditMode(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/auth/user/${currentStudent.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
            body: JSON.stringify(editedStudent),
          }
        );
        const data = await response.json();
        setStudents(
          students.map((student) =>
            student.id === currentStudent.id ? data : student
          )
        );
        setEditMode(false);
        setEditedStudent({
          firstName: "",
          lastName: "",
          email: "",
          dateOfBirth: "",
          gender: "",
        }); // Reset editedStudent state
      } catch (error) {
        setError(error.message);
      }
    } else if (addMode) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
          }
        );
        const data = await response.json();
        setStudents([...students, data]);
        setAddMode(false);
        setNewStudent({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          dateOfBirth: "",
          gender: "",
        }); // Reset newStudent state
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const confirmDelete = (student) => {
    setStudentToDelete(student);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      handleDelete(studentToDelete);
      setStudentToDelete(null);
      setShowConfirmation(false);
    }
  };

  return (
    <div className="p-6 font-sans w-[1130px] border-2 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Students</h1>
      {loading && <p className="text-lg text-gray-500">Loading...</p>}
      {error && <p className="text-lg text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <>
          <div className="flex gap-[500px]">
            <p className="text-lg text-gray-700 mb-4">
              Number of registered students: {students.length}
            </p>
            <div
              onClick={() => setAddMode(true)}
              className="bg-[#C5D86D] hover:bg-black hover:text-white gap-3 text-black px-4 py-2 flex w-[270px] h-[45px] rounded-xl border-2 items-center cursor-pointer mx-auto mb-8"
            >
              <div>
                <IoMdPersonAdd />
              </div>

              <h2 className="text-lg font-semibold text-center truncate">
                Add User
              </h2>
            </div>
          </div>
          <div className="overflow-x-auto border-collapse border rounded-xl">
            <table className="min-w-full bg-white">
              <thead className="bg-[#0D1321] text-white">
                <tr>
                  <th className="py-2 px-4 border-b border-r text-center">
                    First Name
                  </th>
                  <th className="py-2 px-4 border-b border-r text-center">
                    Last Name
                  </th>
                  <th className="py-2 px-4 border-b border-r text-center">
                    Email
                  </th>
                  <th className="py-2 px-4 border-b border-r text-center">
                    Date of Birth
                  </th>
                  <th className="py-2 px-4 border-b border-r text-center">
                    Gender
                  </th>
                  <th className="py-2 px-4 border-b border-r text-center"></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="py-2 px-4 border-b border-r text-center">
                      {student.firstName}
                    </td>
                    <td className="py-2 px-4 border-b border-r text-center">
                      {student.lastName}
                    </td>
                    <td className="py-2 px-4 border-b border-r text-center">
                      {student.email}
                    </td>
                    <td className="py-2 px-4 border-b border-r text-center">
                      {student.dateOfBirth}
                    </td>
                    <td className="py-2 px-4 border-b border-r text-center">
                      {student.gender}
                    </td>
                    <td className="py-2 px-4 border-b border-r text-center">
                      <button
                        className=" mr-2 px-4 bg-[#C5D86D] w-[75px] h-[35px] rounded-xl"
                        onClick={() => handleEditClick(student)}
                      >
                        Edit
                      </button>
                      <button
                        className=" px-4 bg-red-500 w-[75px] h-[35px] rounded-xl"
                        onClick={() => confirmDelete(student)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {(editMode || addMode) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[500px] p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              {editMode ? "Edit Student" : "Add Student"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={
                    editMode ? editedStudent.firstName : newStudent.firstName
                  }
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={editMode ? editedStudent.lastName : newStudent.lastName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={editMode ? editedStudent.email : newStudent.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {!editMode && (
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={newStudent.password}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={
                    editMode ? editedStudent.dateOfBirth : newStudent.dateOfBirth
                  }
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={editMode ? editedStudent.gender : newStudent.gender}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setAddMode(false);
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                >
                  {editMode ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmationDialog
        isOpen={showConfirmation}
        message="Are you sure you want to delete this student?"
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Students;
