import { analyzeImageWithDeepSeek } from './deepseek';

// Функция для отправки изображения на обработку через DeepSeek
export const processImage = async (imageUrl: string) => {
    try {
        const result = await analyzeImageWithDeepSeek(imageUrl);
        return result;
    } catch (error) {
        console.error('Error processing the image:', error);
        throw error;
    }
};