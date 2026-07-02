import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    status: { type: String, enum: ['pending', 'approved'], default: 'pending' } // approved or pending
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);