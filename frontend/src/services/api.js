import axios from 'axios';
                                  //http://localhost:5000/api
const API = axios.create({
    baseURL: 'http://3.220.52.221:5000/api'
});

// 💡 හැම Request එකකටම කලින් LocalStorage එකේ Token එකක් තියෙනවා නම් ඒක Header එකට ඇඩ් කරන ලොජික් එක
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// ==== Auth API ====
export const loginUser = (authData) => API.post('/auth/login', authData);
export const registerUser = (authData) => API.post('/auth/register', authData);

// ==== Events API ====
export const getEvents = () => API.get('/events');
export const createEvent = (eventData) => API.post('/events/create', eventData);
export const updateEvent = (id, eventData) => API.put(`/events/update/${id}`, eventData);
export const deleteEvent = (id) => API.delete(`/events/delete/${id}`);

// ==== Bookings API ====
export const bookTicket = (eventId) => API.post('/bookings/book', { eventId });
export const getMyBookings = () => API.get('/bookings/my-bookings');
export const cancelBooking = (id) => API.delete(`/bookings/cancel/${id}`);
export const getAllBookingsForAdmin = () => API.get('/bookings/admin/all');
export const approveBooking = (id) => API.put(`/bookings/admin/approve/${id}`);
export const getUserBookings = () => API.get('/bookings/my-bookings');
