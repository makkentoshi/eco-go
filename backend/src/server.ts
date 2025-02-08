import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import useRoutes from './routes/useRoutes';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Подключаем объединенные роуты
app.use('/api', useRoutes);

// Дополнительный endpoint для /ranking
app.get('/ranking', (req, res) => {
    const rankingData = [
        { name: 'MIT Institute', points: 12500, reports: 450, badge: '🎓' },
        { name: 'Stanford Tech', points: 9800, reports: 320, badge: '🏛️' },
        { name: 'Harvard Eco', points: 7500, reports: 280, badge: '🌿' }
    ];
    res.json(rankingData);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
