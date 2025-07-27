import axios from './AxiosConfig';

export const getAllUsers = async () => {
  const res = await axios.get('/admin/user-view');
  return res.data.AllUserdata;
};

export const deleteUserById = async (id) => {
  const res = await axios.delete(`/admin/user-delete/${id}`);
  return res.data;
};

export const getAllProperties = async () => {
  const res = await axios.get('/admin/property-view');
  return res.data.AllPropertyData;
};

export const deletePropertyById = async (id) => {
  const res = await axios.delete(`/admin/property-delete/${id}`);
  return res.data;
};

export const getAllBookings = async () => {
  const res = await axios.get('/admin/booking-view');
  return res.data.AllBookingData;
};

export const deleteBookingById = async (id) => {
  const res = await axios.delete(`/admin/booking-delete/${id}`);
  return res.data;
};

export const getAdminProfile = async () => {
  const res = await axios.get('/admin/profile');
  return res.data.user;
};

