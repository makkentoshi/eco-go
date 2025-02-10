"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = void 0;
// imageProcessing.ts
const gemini_1 = require("./gemini");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs"); // Import promises-based fs
// Функция для отправки изображения на обработку
const processImage = (imagePath_1, ...args_1) => __awaiter(void 0, [imagePath_1, ...args_1], void 0, function* (imagePath, useGemini = true) {
    try {
        let result;
        const imageBase64 = yield imageUrlToBase64(imagePath);
        result = yield (0, gemini_1.analyzeImageWithGemini)(imageBase64);
        return result;
    }
    catch (error) {
        console.error('Error processing the image:', error);
        throw error;
    }
});
exports.processImage = processImage;
// Implement this function to convert an image URL to a base64 string
const imageUrlToBase64 = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const absolutePath = path_1.default.resolve(imagePath); // Получаем абсолютный путь
        const fileBuffer = yield fs_1.promises.readFile(absolutePath); // Читаем файл
        const base64 = fileBuffer.toString('base64');
        // Determine the image type (you might need a more robust solution)
        let mimeType = 'image/jpeg'; // Default to jpeg
        if (imagePath.toLowerCase().endsWith('.png')) {
            mimeType = 'image/png';
        }
        // Remove the data:image/...;base64 prefix
        const base64Data = base64.replace(/^data:image\/(png|jpeg);base64,/, '');
        return base64Data;
    }
    catch (error) {
        console.error("Error converting image to base64:", error);
        throw error;
    }
});
