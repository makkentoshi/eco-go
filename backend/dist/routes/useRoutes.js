"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const eventRoutes_1 = __importDefault(require("./eventRoutes"));
const videoRoutes_1 = __importDefault(require("./videoRoutes"));
const reportRoutes_1 = __importDefault(require("./reportRoutes"));
const router = express_1.default.Router();
router.use('/users', userRoutes_1.default);
router.use('/events', eventRoutes_1.default);
router.use('/videos', videoRoutes_1.default);
router.use('/reports', reportRoutes_1.default);
exports.default = router;
