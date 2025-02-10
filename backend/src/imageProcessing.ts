// imageProcessing.ts
import { analyzeImageWithGemini } from './gemini';
import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs'; // Import promises-based fs

// Функция для отправки изображения на обработку
export const processImage = async (imagePath: string, useGemini: boolean = true) => {
    try {
        let result;
        const imageBase64 = await imageUrlToBase64(imagePath);
        result = await analyzeImageWithGemini(imageBase64);
        return result;
    } catch (error) {
        console.error('Error processing the image:', error);
        throw error;
    }
};

// Implement this function to convert an image URL to a base64 string
const imageUrlToBase64 = async (imagePath: string): Promise<string> => {
    try {
        const absolutePath = path.resolve(imagePath); // Получаем абсолютный путь
        const fileBuffer = await fsPromises.readFile(absolutePath); // Читаем файл
        const base64 = fileBuffer.toString('base64');
        // Determine the image type (you might need a more robust solution)
        let mimeType = 'image/jpeg'; // Default to jpeg
        if (imagePath.toLowerCase().endsWith('.png')) {
            mimeType = 'image/png';
        }
          // Remove the data:image/...;base64 prefix
          const base64Data = base64.replace(/^data:image\/(png|jpeg);base64,/, '');
        return base64Data
        } catch (error) {
      console.error("Error converting image to base64:", error);
      throw error;
    }
  };