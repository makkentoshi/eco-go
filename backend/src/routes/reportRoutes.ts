import express from 'express';
import multer from 'multer';
import { processImage } from '../imageProcessing';
import Report from '../models/Report';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { file, body } = req;

    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const { latitude, longitude, description } = body;
    if (!latitude || !longitude) {
      res.status(400).json({ error: 'Missing required fields: latitude or longitude' });
      return;
    }

    // Accessing file path correctly
    const absolutePath = path.resolve(file.path);

    const aiAnalysis = await processImage(absolutePath);

    const { estimated_weight_kg, co2_emission_kg, recyclability_percentage, dominant_waste_types } = aiAnalysis;

    // Determine trash type (using the first dominant type)
    const trashType = dominant_waste_types && dominant_waste_types.length > 0 ? dominant_waste_types[0] || 'unknown' : 'unknown';

    const newReport = new Report({
      photo: absolutePath,
      location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
      trashType: trashType,
      kg: estimated_weight_kg || 0,
      CO2Emissions: co2_emission_kg || 0,
      recyclablePercentage: recyclability_percentage || 0,
      description: description || '',
    });

    await newReport.save();
    res.status(200).json({
      kg: estimated_weight_kg || 0,
      CO2Emissions: co2_emission_kg || 0,
      recyclablePercentage: recyclability_percentage || 0,
      dominant_waste_types: dominant_waste_types || [],
    });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Error creating report' });
  }
});

export default router;