"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReportSchema = new mongoose_1.default.Schema({
    photo: { type: String, required: true }, // URL изображения или путь к файлу
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    trashType: { type: String, enum: ['glass', 'plastic', 'paper', 'metal', 'organic'], required: true },
    kg: { type: Number, required: true },
    CO2Emissions: { type: Number, required: true }, // Выбросы CO2
    recyclablePercentage: { type: Number, required: true }, // Процент переработки
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});
const Report = mongoose_1.default.model('Report', ReportSchema);
exports.default = Report;
