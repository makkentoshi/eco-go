"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    organizer: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    participants: { type: Number, required: true },
    description: { type: String, required: true },
    emoji: { type: String, required: true },
});
const Event = mongoose_1.default.model('Event', EventSchema);
exports.default = Event;
