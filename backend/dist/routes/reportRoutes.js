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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const imageProcessing_1 = require("../imageProcessing");
const Report_1 = __importDefault(require("../models/Report"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/', upload.single('photo'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const aiAnalysis = yield (0, imageProcessing_1.processImage)(imageUrl);
        if (!aiAnalysis) {
            res.status(500).json({ error: 'Failed to analyze the image' });
            return; // Завершаем выполнение функции
        }
        const analysisResult = JSON.parse(aiAnalysis);
        const { type, co2, recyclablePercentage } = analysisResult;
        const newReport = new Report_1.default({
            photo: imageUrl,
            location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
            trashType: type || trashType,
            kg: parseFloat(kg),
            CO2Emissions: co2 || 0,
            recyclablePercentage: recyclablePercentage || 0,
            description: description || '',
        });
        yield newReport.save();
        res.status(200).json(newReport);
    }
    catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ error: 'Error creating report' });
    }
}));
exports.default = router;
