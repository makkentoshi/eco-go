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
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/', upload.single('photo'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const absolutePath = path_1.default.resolve(file.path);
        const aiAnalysis = yield (0, imageProcessing_1.processImage)(absolutePath);
        const { estimated_weight_kg, co2_emission_kg, recyclability_percentage, dominant_waste_types } = aiAnalysis;
        // Determine trash type (using the first dominant type)
        const trashType = dominant_waste_types && dominant_waste_types.length > 0 ? dominant_waste_types[0] || 'unknown' : 'unknown';
        const newReport = new Report_1.default({
            photo: absolutePath,
            location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
            trashType: trashType,
            kg: estimated_weight_kg || 0,
            CO2Emissions: co2_emission_kg || 0,
            recyclablePercentage: recyclability_percentage || 0,
            description: description || '',
        });
        yield newReport.save();
        res.status(200).json({
            kg: estimated_weight_kg || 0,
            CO2Emissions: co2_emission_kg || 0,
            recyclablePercentage: recyclability_percentage || 0,
            dominant_waste_types: dominant_waste_types || [],
        });
    }
    catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ error: 'Error creating report' });
    }
}));
exports.default = router;
