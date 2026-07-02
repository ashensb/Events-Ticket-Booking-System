import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    price: { type: Number, required: true },
    totalTickets: { type: Number, required: true },
    availableTickets: { type: Number, required: true } // This field will be initialized to totalTickets when the event is created
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;