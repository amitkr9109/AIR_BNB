import React, { useEffect, useState } from 'react';
import { getAllProperties, deletePropertyById } from '../../API/AdminService';
import { toast } from 'react-toastify';

const Allproperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllProperties()
      .then((data) => setProperties(data))
      .catch(() => toast.error("Failed to load properties"));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this property?");
    if (!confirm) return;

    try {
      await deletePropertyById(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property deleted");
    } catch {
      toast.error("Failed to delete property");
    }
  };

  return (
    <main className="flex-1 px-6">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">All Properties</h2>
        <table className="w-full text-left border-separate border-spacing-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Location</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((propety) => (
              <tr key={propety._id}>
                <td>{propety.Title}</td>
                <td>₹ {propety.Price}</td>
                <td>{propety.Location}</td>
                <td>{new Date(propety.createdAt).toLocaleDateString()}</td>
                <button onClick={() => handleDelete(propety._id)} className="bg-red-600 text-white px-3 py-1 rounded active:scale-95 cursor-pointer hover:bg-red-700">Remove</button>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );c
};

export default Allproperties;