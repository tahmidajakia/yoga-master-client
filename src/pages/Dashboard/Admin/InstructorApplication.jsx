import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const InstructorApplication = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosPublic = useAxiosPublic();
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    // Fetch the list of applications for the instructor role
    axiosFetch
      .get("/applied")
      .then((res) => {
        setApplied(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to handle the approval of the instructor application
  const handleAcceptInstructor = async (email) => {
    console.log('Email Passed:', email);
  
    try {
      const response = await fetch(`http://localhost:5000/user/role/${email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'instructor' }),
      });
  
      if (response.ok) {
        console.log('Role updated successfully');
        setApplied((prev) =>
          prev.filter((application) => application.email !== email)
        );
        alert('Instructor application accepted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error updating role:', errorData.message);
        alert('Error updating role');
      }
    } catch (error) {
      console.error('Error in PATCH request:', error);
      alert('Error in PATCH request');
    }
  };

  return (
    <div className="p-4 mt-20 lg:mt-5">
      <h1 className="text-xl font-bold mb-4">
        Instructor Applications ({applied.length})
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Experience</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {applied.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No applications found.
                </td>
              </tr>
            ) : (
              applied.map((application) => (
                <tr key={application.email} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {application.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {application.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {application.experience || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleAcceptInstructor(application.email)} 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Accept as Instructor
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorApplication;
