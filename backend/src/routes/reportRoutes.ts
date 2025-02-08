import express from 'express';
import multer from 'multer';
import { processImage } from '../imageProcessing';
import Report from '../models/Report';

const router = express.Router();


const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { file, body } = req;

    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return; // Завершаем выполнение функции
    }

    const { latitude, longitude, trashType, kg, description } = body;
    if (!latitude || !longitude || !kg) {
      res.status(400).json({ error: 'Missing required fields: latitude, longitude, or kg' });
      return; // Завершаем выполнение функции
    }

    const imageUrl = file.path;
    const aiAnalysis = await processImage(imageUrl);

    if (!aiAnalysis) {
      res.status(500).json({ error: 'Failed to analyze the image' });
      return; // Завершаем выполнение функции
    }

    const analysisResult = JSON.parse(aiAnalysis);
    const { type, co2, recyclablePercentage } = analysisResult;

    const newReport = new Report({
      photo: imageUrl,
      location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
      trashType: type || trashType,
      kg: parseFloat(kg),
      CO2Emissions: co2 || 0,
      recyclablePercentage: recyclablePercentage || 0,
      description: description || '',
    });

    await newReport.save();
    res.status(200).json(newReport);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Error creating report' });
  }
});

export default router;