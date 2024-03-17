
import React, { useState, useEffect } from "react";
import Logo from "../../logo.png";
import axios from "axios";

export default function AdminTable() {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const fetchUserRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user-requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching user requests:", error);
    }
  };

  useEffect(() => {
    fetchUserRequests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user-requests", formData);
      fetchUserRequests();
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error("Error submitting user request:", error);
    }
  };

  const handleAction = async (id) => {
    try {
      await axios.put(`http://localhost:5000/user-requests/${id}`);
      fetchUserRequests();
    } catch (error) {
      console.error("Error updating user request:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user-requests/${id}`);
      fetchUserRequests();
    } catch (error) {
      console.error("Error removing user request:", error);
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.put(`http://localhost:5000/user-requests/${id}/deny`);
      fetchUserRequests();
    } catch (error) {
      console.error("Error denying access:", error);
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center p-7">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="flex justify-center items-center p-7">
        <button
          className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleFormVisibility}
        >
          {showForm ? "Hide Request Form" : "Show Request Form"}
        </button>
      </div>
      {showForm && (
        <div className="flex justify-center items-center p-7 ">
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className=" bg-slate-400  shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Enter your name:
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-black text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Enter your email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center p-7">
        <div className="overflow-x-auto w-full">
          <table className="border-collapse border border-gray-400 w-full bg-white shadow-lg">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2 bg-slate-500">
                  S.No
                </th>
                <th className="border border-gray-400 px-4 py-2 bg-slate-500">
                  Name
                </th>
                <th className="border border-gray-400 px-4 py-2 bg-slate-500">
                  Email
                </th>
                <th className="border border-gray-400 px-4 py-2 bg-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {requests.map((request, index) => (
                <tr key={request._id}>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    {request.name}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    {request.email}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    {request.access ? (
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeny(request._id)}
                      >
                        Deny access
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleAction(request._id)}
                      >
                        Allow access
                      </button>
                    )}
                    <button
                      className="bg-red-500 hover:bg-red-700 ml-5 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleRemove(request._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
