import AdminRoute from "@/components/Admin/AdminRoute";
import StudentForm from "@/components/Admin/Students/StudentForm";
import ConfirmationDialog from "@/components/ui/ConfirmationDialogue";
import Toggle from "@/components/ui/Toggle";
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
  const [addMode, setAddMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [{ auth }] = useCookies(["auth"]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [loadingStudentId, setLoadingStudentId] = useState(null);
  const [toggleCheck, settoggleCheck] = useState(false)
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/students", {
          method: "GET",
          headers: {
            Authorization: auth,
            'Cache-Control': 'no-cache',
          },
        });
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [auth, editMode, addMode,toggleCheck]);

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setEditMode(true);
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

  const handleFormSubmit = async (data) => {
    if (editMode) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/auth/user/${currentStudent._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
            body: JSON.stringify(data),
          }
        );
        const updatedStudent = await response.json();
        setStudents(
          students.map((student) =>
            student._id === currentStudent._id ? updatedStudent : student
          )
        );
        setEditMode(false);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const response = await fetch(
          "http://localhost:4000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const newStudent = await response.json();
        setStudents([...students, newStudent]);
        setAddMode(false);
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

  const handleToggleActive = async (student) => {
    setLoadingStudentId(student._id);
    try {
      const updatedStudent = { ...student, active: !student.active };
      const response = await axios.put(
        `http://localhost:4000/api/auth/user/${student._id}`,
        updatedStudent,
        {
          headers: {
            Authorization: auth,
            "Content-Type": "application/json",
          },
        }
      );
      
      setStudents(prevStudents =>
        prevStudents.map(s => s._id === student._id ? response.data : s)
      );
      settoggleCheck((prev)=>!prev)
      toast(`Student ${updatedStudent.active ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Failed to update student status");
    } finally {
      setLoadingStudentId(null);
    }
  };
  return (
    <AdminRoute>
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
                  Add Student
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
                    <th className="py-2 px-4 border-b border-r text-center">Actions</th>
                    <th className="py-2 px-4 border-b border-r text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
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
                      <td className="py-2  border-b border-r pl-8 text-center">
                    <Toggle
                      checked={student.active}
                      onChange={() => handleToggleActive(student)}
                      disabled={loadingStudentId === student._id}
                    />
                  </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {(editMode || addMode) && (
          <StudentForm
            initialData={editMode ? currentStudent : null}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setEditMode(false);
              setAddMode(false);
            }}
          />
        )}
        <ConfirmationDialog
          isOpen={showConfirmation}
          message="Are you sure you want to delete this student?"
          onCancel={() => setShowConfirmation(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdminRoute>
  );
};

export default Students;
