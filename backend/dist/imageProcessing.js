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
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImage = void 0;
const deepseek_1 = require("./deepseek");
// Функция для отправки изображения на обработку через DeepSeek
const processImage = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, deepseek_1.analyzeImageWithDeepSeek)(imageUrl);
        return result;
    }
    catch (error) {
        console.error('Error processing the image:', error);
        throw error;
    }
});
exports.processImage = processImage;
