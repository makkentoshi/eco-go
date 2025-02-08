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
const Video_1 = __importDefault(require("../models/Video"));
const router = express_1.default.Router();
// === Получить все видео ===
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield Video_1.default.find();
        res.json(videos);
    }
    catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
}));
// === Создать новое видео ===
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔍 Полученные данные:", req.body);
        const { title, category, duration, views, thumbnail, emoji, url } = req.body;
        const video = new Video_1.default({ title, category, duration, views, thumbnail, emoji, url });
        yield video.save();
        res.status(201).json(video);
    }
    catch (error) {
        console.error("Ошибка при создании видео: ", error);
        res.status(500).json({
            message: "Ошибка сервера",
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
exports.default = router;
