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
const Event_1 = __importDefault(require("../models/Event"));
const router = express_1.default.Router();
// === EVENTS ===
// Получить все ивенты
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield Event_1.default.find();
        res.json(events);
    }
    catch (error) {
        console.error("Error: ", error);
    }
}));
// Создать новый ивент
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, organizer, date, time, location, participants, description, emoji } = req.body;
        const event = new Event_1.default({ title, organizer, date, time, location, participants, description, emoji });
        yield event.save();
        res.status(201).json(event);
    }
    catch (error) {
        console.error("Error: ", error);
    }
}));
exports.default = router;
