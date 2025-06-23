import React, { useEffect, useState } from 'react';
import axios from 'axios'; // ← You forgot to import this
import { API } from '../api/api'; // Optional if you're using axios directly

export default function Category() {
  const [category, setcategory] = useState([]);

  const fetchcategory = async () => {
    try {
      const response = await axios.get("https://testaoron.limsa.uz/api/category");
      setcategory(response?.data?.data); // Adjust based on actual API structure
      console.log("categorys fetched:", response?.data?.data);
    } catch (err) {
      console.error("Error fetching categorys:", err);
    }
  };

  // 👇 useEffect must be **outside** the fetch function
  useEffect(() => {
    fetchcategory();
  }, []);

  return (
    <div className="overflow-x-auto px-4 py-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Categorys</h2>
        <button className="border py-2 px-3 bg-green-500 text-white rounded hover:bg-green-600">
          Add category
        </button>
      </div>

      <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="text-left px-6 py-3">#</th>
            <th className="text-left px-6 py-3">Title ENG</th>
            <th className="text-left px-6 py-3">Title RU</th>
            <th className="text-left px-6 py-3">Title DE</th>
            <th className="text-left px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {category && category.length > 0 ? (
            category.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100 border-b">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{item?.name_en}</td>
                <td className="px-6 py-4">{item?.name_ru}</td>
                <td className="px-6 py-4">{item?.name_de}</td>              

                <td className="px-6 py-4">
                  <button className="border w-[45px] mr-2 text-white px-1 bg-blue-600 rounded hover:bg-white hover:border-2 hover:text-black">
                    Edit
                  </button>
                  <button className="border w-[65px] text-white px-1 bg-red-600 rounded hover:bg-white hover:border-2 hover:text-black">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center px-6 py-4 text-gray-500">
                No categorys found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
