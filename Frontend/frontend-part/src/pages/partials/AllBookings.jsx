import React, { useEffect, useState } from 'react';
import { getAllBookings, deleteBookingById } from '../../API/AdminService';
import { toast } from 'react-toastify';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getAllBookings()
      .then((data) => setBookings(data))
      .catch(() => toast.error("Failed to load bookings"));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this property?");
    if (!confirm) return;

    try {
      await deleteBookingById(id);
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
      toast.success("Booking deleted");
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  return (
    <main className="flex-1 px-6">
      <section className="bg-white p-6 rounded-lg shadow-md min-h-[80vh]">
        <h2 className="text-xl font-bold mb-4">All Bookings</h2>
        <div className="grid grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded-lg shadow">
              <p><strong>User:</strong> {booking.user_id}</p>
              <p><strong>Property:</strong> {booking.Property}</p>
              <p><strong>Price:</strong> ₹{booking.TotalPrice}</p>
              <p><strong>Status:</strong> <span className={
                booking.Status === "Confirmed" ? "text-green-600" :
                booking.Status === "Pending" ? "text-orange-600" : "text-red-600"
              }>{booking.Status}</span></p>
              <p><strong>Check In:</strong> {new Date(booking.Checkin_date).toLocaleDateString()}</p>
              <p><strong>Check Out:</strong> {new Date(booking.Checkout_date).toLocaleDateString()}</p>
              <button onClick={() => handleDelete(booking._id)} className="bg-red-600 text-white px-3 py-1 rounded active:scale-95 cursor-pointer hover:bg-red-700 mt-2">Remove</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AllBookings;