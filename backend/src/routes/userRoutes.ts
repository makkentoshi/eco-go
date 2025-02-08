import express from 'express';
import User from '../models/User';

const router = express.Router();

// === USERS ===
// Получить всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    
    res.json(users);
  } catch (error) {
    console.error("Error: ", error);
    
  }
});

// Создать пользователя
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
    
  } catch (error) {
    console.error("Error: ", error);
    
  }

});

export default router;
