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
exports.analyzeImageWithDeepSeek = void 0;
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY || 'YOUR_DEEPSEEK_API_KEY',
});
const analyzeImageWithDeepSeek = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completion = yield openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Analyze the image at ${imageUrl} and determine the type of trash (glass, plastic, paper, metal, organic), its weight in kilograms, CO2 emissions, and recyclable percentage. Return the result as a JSON object.` }
            ],
            model: "deepseek-chat",
        });
        // Возвращаем результат анализа
        return completion.choices[0].message.content;
    }
    catch (error) {
        console.error('Error analyzing the image with DeepSeek:', error);
        throw error;
    }
});
exports.analyzeImageWithDeepSeek = analyzeImageWithDeepSeek;
