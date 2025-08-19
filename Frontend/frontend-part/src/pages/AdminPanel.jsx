import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { getAdminProfile } from "../API/AdminService";

const AdminPanel = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await getAdminProfile();
        setAdmin(data);
      } catch (error) {
        console.log("Failed to load admin profile", error);
      }
    };
    fetchAdmin();
  }, []);

  return (
    <div className="min-h-screen flex bg-zinc-100 px-20 pt-35 pb-10 relative">
      <div className="w-[25%] bg-white shadow-xl rounded-xl sticky top-[16vh] h-[80vh]">
        <div className="p-4 mt-auto">
          <div className="flex items-center">
            <Link to="/admin"><div className="logo px-4 py-3 bg-slate-400 rounded-full active:scale-95 hover:bg-slate-500"><i className="ri-user-fill"></i></div></Link>
            <div className="ml-4">
              <p className="text-gray-700 font-medium">
                {admin?.username || "Loading..."}
              </p>
              <p className="text-gray-500 text-sm">
                {admin?.email || "admin@example.com"}
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-1 w-full">
          <div className="w-full flex flex-col gap-1 ">
            <NavLink to={'/admin/users'} className={(e) => e.isActive ? "bg-zinc-200 px-4 py-2 w-full" : "w-full px-4 py-2 hover:bg-zinc-200 active:scale-95" }>AllUsers :-</NavLink>
            <NavLink to={'/admin/properties'} className={(e) => e.isActive ? "bg-zinc-200 px-4 py-2 w-full" : "w-full px-4 py-2 hover:bg-zinc-200 active:scale-95" }>AllProperties :-</NavLink>
            <NavLink to={'/admin/bookings'} className={(e) => e.isActive ? "bg-zinc-200 px-4 py-2 w-full" : "w-full px-4 py-2 hover:bg-zinc-200 active:scale-95" }>AllBookings :-</NavLink>
          </div>
        </nav>
      </div>
      <div className="w-full h-fit">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
