"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VideoSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    views: { type: String, required: false },
    thumbnail: { type: String, required: true },
    emoji: { type: String, required: false },
    url: { type: String, required: true }
});
const Video = mongoose_1.default.model('Video', VideoSchema);
exports.default = Video;
