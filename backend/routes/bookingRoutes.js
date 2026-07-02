import express from 'express';
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// 1. Book a Ticket (🔒 Logged-in Users Only)
router.post('/book', verifyToken, async (req, res) => {
    try {
        const { eventId } = req.body;
        const event = await Event.findById(eventId);

        if (!event) return res.status(404).json({ message: "Event not found!" });
        if (event.availableTickets <= 0) return res.status(400).json({ message: "🚫 Sold out!" });

        // Decrease the available tickets for the event
        event.availableTickets -= 1;
        await event.save();

        // Create a new booking in the database (Status is default 'pending')
        const newBooking = new Booking({
            user: req.user.id, 
            event: eventId
        });
        await newBooking.save();

        res.status(201).json({ message: "🎟️ Ticket booking requested! Waiting for admin approval.", newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Get User's Bookings (🔒 Logged-in Users Only - show only your ticket)
router.get('/my-bookings', verifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('event');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Delete/Cancel Booking (🔒 Logged-in Users Only - cancel a ticket)
router.delete('/cancel/:id', verifyToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found!" });

        // check if the booking belongs to the logged-in user
        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized action!" });
        }

        // cancel the ticket and increase the available tickets for the event
        const event = await Event.findById(booking.event);
        if (event) {
            event.availableTickets += 1;
            await event.save();
        }

        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "🗑️ Booking cancelled successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Get All Bookings for Approval (🔒 Admin Only - only show admin)
router.get('/admin/all', verifyToken, isAdmin, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'name email').populate('event', 'title');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Approve Booking (🔒 Admin Only - approve booking)
router.put('/admin/approve/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "Booking not found!" });

        booking.status = 'approved';
        await booking.save();

        res.status(200).json({ message: "✅ Booking approved by admin successfully!", booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;