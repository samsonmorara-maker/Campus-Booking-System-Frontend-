import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard/stats");
  return response.data;
};

export const getAllBookings = async (status) => {
  const response = await api.get("/admin/bookings", {
    params: status ? { status } : {},
  });
  return response.data;
};

export const approveBooking = async (bookingId) => {
  const response = await api.patch(`/admin/bookings/${bookingId}/approve`);
  return response.data;
};

export const rejectBooking = async (bookingId) => {
  const response = await api.patch(`/admin/bookings/${bookingId}/reject`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};
