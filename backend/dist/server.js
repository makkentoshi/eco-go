"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const useRoutes_1 = __importDefault(require("./routes/useRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
// Подключаем объединенные роуты
app.use('/api', useRoutes_1.default);
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
