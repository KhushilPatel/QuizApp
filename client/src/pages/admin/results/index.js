import React, { useState, useEffect } from "react";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#__next"); // Assuming you're using Next.js

const Results = () => {
  const [clientData, setClientData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        console.log("Fetching client data...");
        const response = await fetch(
          "http://localhost:4000/api/admin/all-client-data"
        );
        const data = await response.json();
        console.log("Received client data:", JSON.stringify(data, null, 2));
        setClientData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching client data:", err);
        setError("Failed to fetch client data");
        setLoading(false);
      }
    };
    fetchClientData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      setFilteredData(
        clientData.filter((client) =>
          `${client.firstName} ${client.lastName}`
            .toLowerCase()
            .includes(lowercasedTerm)
        )
      );
    } else {
      setFilteredData(clientData);
    }
  }, [searchTerm, clientData]);

  const openModal = (client) => {
    console.log("Opening modal for client:", JSON.stringify(client, null, 2));
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "500px",
      width: "100%",
      maxHeight: "80vh",
      overflow: "auto",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  if (loading)
    return (
      <div className="text-center py-10 text-xl text-gray-600">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-xl text-red-600">
        Error: {error}
      </div>
    );

  return (
    <div className="container w-[1200px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Admin Dashboard: Client Quiz Results
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-700">
                Client Name
              </th>
              <th className="text-left p-4 font-medium text-gray-700">Email</th>
              <th className="text-left p-4 font-medium text-gray-700">
                Date of Birth
              </th>
              <th className="text-left p-4 font-medium text-gray-700">
                Gender
              </th>
              <th className="text-left p-4 font-medium text-gray-700">
                Status
              </th>
              <th className="text-left p-4 font-medium text-gray-700">
                Attempted Quizzes
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((client) => (
              <tr key={client.userId} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  {client.firstName} {client.lastName}
                </td>
                <td className="p-4">{client.email}</td>
                <td className="p-4">{client.dateOfBirth}</td>
                <td className="p-4">{client.gender}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      client.active
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {client.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4">
                  {client.attemptedQuizzes.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">
                      No quizzes attempted yet.
                    </p>
                  ) : (
                    <button
                      onClick={() => openModal(client)}
                      className="text-blue-500 hover:underline"
                    >
                      View Attempted Quizzes
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Attempted Quizzes"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 font-bold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {selectedClient && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Attempted Quizzes for {selectedClient.firstName}{" "}
              {selectedClient.lastName}
            </h2>
            {selectedClient.attemptedQuizzes.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                No quizzes attempted yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {selectedClient.attemptedQuizzes.map((quiz) => {
                  console.log("Rendering quiz:", JSON.stringify(quiz, null, 2));
                  return (
                    <li key={quiz.quizId} className="bg-gray-50 rounded p-3">
                      <div className="font-medium text-gray-800 mb-1">
                        {quiz.quizName}
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-green-600">
                          Score:{" "}
                          {((quiz.score / quiz.totalQuestions) * 100).toFixed(
                            2
                          )}
                          %
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            quiz.completed
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {quiz.completed ? "Completed" : "In Progress"}
                        </span>
                      </div>
                      {quiz.completed && (
                        <div className="text-xs text-gray-500 mt-1">
                          Completed:{" "}
                          {new Date(quiz.completedAt).toLocaleString()}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default Results;
