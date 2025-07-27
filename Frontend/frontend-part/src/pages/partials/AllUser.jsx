import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUserById } from '../../API/AdminService';
import { toast } from 'react-toastify';

const AllUser = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data))
      .catch(() => toast.error("Failed to load users"));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this property?");
    if (!confirm) return;
    
    try {
      await deleteUserById(id);
      setUsers((prev) => prev.filter((Id) => Id._id !== id));
      toast.success("User deleted");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  return (
    <main className="flex-1 px-6">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">All Users</h2>
        <div className="heading w-full">
            <div className='flex items-center justify-around'>
              <h2 className='font-semibold'>Username</h2>
              <h2 className='font-semibold'>Email</h2>
              <h2 className='font-semibold'>Created At</h2>
              <h2 className='font-semibold'>Actions</h2>
            </div>
            <div className="flex flex-col gap-5 mt-10 ml-5">
                {users.map((user) => (
                    <div key={user._id} className='flex items-center justify-around'>
                        <h1>{user.username}</h1>
                        <h1>{user.email}</h1>
                        <h1>{new Date(user.createdAt).toLocaleDateString()}</h1>
                        <button onClick={() => handleDelete(user._id)} className="bg-red-600 text-white px-3 py-1 rounded active:scale-95 cursor-pointer hover:bg-red-700">Remove</button>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </main>
  );
};

export default AllUser;



