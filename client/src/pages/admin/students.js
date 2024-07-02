import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [{ auth }] = useCookies(['auth']);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/auth/user', {
          method: 'GET',
          headers: {
            Authorization: auth,
          },
        });
        const data = await response.json();
        console.log("data",data)
        setStudents(data.userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [auth]);

  return (
    <div className="p-6 font-sans w-[1230px] border-2 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Students</h1>
      {loading && <p className="text-lg text-gray-500">Loading...</p>}
      {error && <p className="text-lg text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <>
          <p className="text-lg text-gray-700 mb-4">
            Number of registered students: {students.length}
          </p>
          <div className="overflow-x-auto  border-collapse border rounded-xl">
            <table className="min-w-full bg-white">
              <thead className="bg-[#0D1321] text-white">
                <tr>
                  <th className="py-2 px-4 border-b border-r text-center">First Name</th>
                  <th className="py-2 px-4 border-b border-r text-center">Last Name</th>
                  <th className="py-2 px-4 border-b border-r text-center">Email</th>
                  <th className="py-2 px-4 border-b border-r text-center">Date of Birth</th>
                  <th className="py-2 px-4 border-b border-r text-center">Gender</th>
                  <th className="py-2 px-4 border-b border-r text-center"></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="py-2 px-4 border-b border-r text-center">{student.firstName}</td>
                    <td className="py-2 px-4 border-b border-r text-center">{student.lastName}</td>
                    <td className="py-2 px-4 border-b border-r text-center">{student.email}</td>
                    <td className="py-2 px-4 border-b border-r text-center">{student.dateOfBirth}</td>
                    <td className="py-2 px-4 border-b border-r text-center">{student.gender}</td>
                    <td className="py-2 px-4 border-b border-r text-center">
                      <button className="py-2 px-4 bg-[#C5D86D] w-[75px] h-[40px] rounded-2xl">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Students;
