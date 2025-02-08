import express from 'express';
import Event from '../models/Event';

const router = express.Router();

// === EVENTS ===
// Получить все ивенты
router.get('/', async (req, res) => {
    try {
        
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error("Error: ", error);
        
    }
});

// Создать новый ивент
router.post('/', async (req, res) => {
    try {
        const { title, organizer, date, time, location, participants, description, emoji } = req.body;
        const event = new Event({ title, organizer, date, time, location, participants, description, emoji });
        await event.save();
        res.status(201).json(event);
        
    } catch (error) {
        console.error("Error: ", error);
        
    }
 
});

export default router;
