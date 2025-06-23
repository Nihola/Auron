import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { API } from '../api/api';

export default function Team() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [image, setImage] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://testaoron.limsa.uz/api/team-section");
      setTeams(response?.data?.data);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTeamMember = async (data) => {
    const formData = new FormData()
    if (image) {
      formData.append("file", image)
    }
    formData.append("full_name", data.full_name)
    formData.append("position_de", data.position_de)
    formData.append("position_ru", data.position_ru)
    formData.append("position_en", data.position_en)

    try {
      const result = selectedTeam ? await API.patch(`/team-section/${selectedTeam.id}`, formData) : await API.post("/team-section", formData)

      if (result.data.success) {
        alert(selectedTeam ? "Updated" : "Added");
        reset();
        setShowModal(false);    
        setSelectedTeam(null);  
        fetchTeams();          
      }
      
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    fetchTeams();
  }, []);
  const openModal = () => {
    setSelectedTeam(null);  
    reset();                 
    setImage(null);         
    setShowModal(true);
    
    
  }
  const showEdit = (team) => {
    setSelectedTeam(team)
    setValue("full_name", team?.full_name)
    setValue("position_de", team?.position_de)
    setValue("position_ru", team?.position_ru)
    setValue("position_en", team?.position_en)
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
    setSelectedTeam(null)
  }
 

  const deleteTeam = async (id) => {
    try {
      const response = await API.delete(`team-section/${id}`);
      if (response.data.success) {
        alert("Deleted");
        fetchTeams(); // <-- add parentheses!
      } else {
        console.error("Delete failed:", response.data);
      }
    } catch (error) {
      console.error("Error deleting team member:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="overflow-x-auto px-4 py-6">
      <div className='flex justify-between mb-4'>
        <h2 className='font-semibold mb-6 mt-0 text-2xl border-emerald-950 hover:bg-emerald-200'>
          Team Members
        </h2>
        <button
          className='border py-2 px-2 bg-green-400'
          
          onClick={openModal}
        >
          Add Team Member
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="loader"></div>
        </div>
      ) : (
        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left px-6 py-3">#</th>
              <th className="text-left px-6 py-3">Image</th>
              <th className="text-left px-6 py-3">Full Name</th>
              <th className="text-left px-6 py-3">Position (EN)</th>
              <th className="text-left px-6 py-3">Position (RU)</th>
              <th className="text-left px-6 py-3">Position (DE)</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams?.map((team, index) => (
              <tr key={team?.id} className="hover:bg-gray-100 border-b">
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={`https://testaoron.limsa.uz/${team.image}`}
                    alt="avatar"
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="px-6 py-4">{team.full_name}</td>
                <td className="px-6 py-4">{team.position_en}</td>
                <td className="px-6 py-4">{team.position_ru}</td>
                <td className="px-6 py-4">{team.position_de}</td>
                <td className="px-6 py-4">
                  <button className='border w-[45px] mr-3 text-white px-1 bg-blue-600 rounded hover:bg-white hover:border-2 hover:text-black' onClick={() => showEdit(team)}>Edit</button>
                  <button className='border w-[65px] mr-3 text-white px-1 bg-red-600 rounded hover:bg-white hover:border-2 hover:text-black' onClick={()=>deleteTeam(team?.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-xl p-6 w-96 relative shadow-lg'>
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold'
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-2" onClick={openModal}>{selectedTeam ? "Editing" : "Adding team member"}</h2>
            <form className="space-y-4">

              <div>
                <label className='block mb-1 text-sm font-medium text-gray-700'>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Fullname"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("full_name")}
                />
              </div>
              <div>
                <label className='block mb-1 text-sm font-medium text-gray-700'>
                  Position
                </label>
                <input
                  type="text"
                  placeholder="mansab"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("position_de")}
                />
              </div>
              <div>
                <label className='block mb-1 text-sm font-medium text-gray-700'>
                  Position
                </label>
                <input
                  type="text"
                  placeholder="pasitsiya"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("position_ru")}
                />
              </div>
              <div>
                <label className='block mb-1 text-sm font-medium text-gray-700'>
                  Position
                </label>
                <input
                  type="text"
                  placeholder="position"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("position_en")}
                />
              </div>
              <div>
                <label className='block mb-1 text-sm font-medium text-gray-700'>
                  Image
                </label>
                <input
                  type="file"

                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setImage(e?.target?.files[0])}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-200 transition hover:text-black"
                  onClick={handleSubmit(addTeamMember)}
                  disabled={loading}
                >
                  {selectedTeam ? (loading ? "Updating" : "Update") : (loading ? "Adding" : "Add")}
                </button>

              </div>

            </form>



          </div>
        </div>
      )}
    </div>
  );
}
