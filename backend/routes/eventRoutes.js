import express from 'express';
import Event from '../models/Event.js';
import { verifyToken, isAdmin } from '../middleware/auth.js'; // 💡 Middleware import කළා

const router = express.Router();

// 1. Get all events 
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Create Event (🔒 Admin Only)
router.post('/create', verifyToken, isAdmin, async (req, res) => {
    try {
        const { title, description, date, price, totalTickets } = req.body;

        
        const newEvent = new Event({
            title,
            description,
            date,
            price,
            totalTickets,
            availableTickets: totalTickets 
        });

        await newEvent.save();
        res.status(201).json({ message: "🎯 Event Created Successfully!", newEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// 3. Update Event (🔒 Admin Only)
router.put('/update/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "📝 Event Updated Successfully!", updatedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Delete Event (🔒 Admin Only)
router.delete('/delete/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "🗑️ Event Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;