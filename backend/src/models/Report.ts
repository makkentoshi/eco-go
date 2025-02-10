import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  photo: { type: String, required: true }, // URL изображения или путь к файлу
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  trashType: { type: String, required: true },
  kg: { type: Number, required: false, default: 0 },
  CO2Emissions: { type: Number, required: false, default: 0 }, // Выбросы CO2
  recyclablePercentage: { type: Number, required: false, default: 0 }, // Процент переработки
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Report = mongoose.model('Report', ReportSchema);
export default Report;