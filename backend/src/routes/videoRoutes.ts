import express from "express";
import Video from "../models/Video";

const router = express.Router();

// === Получить все видео ===
router.get("/", async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// === Создать новое видео ===

router.post("/", async (req, res) => {
    try {
        console.log("🔍 Полученные данные:", req.body);
        const { title, category, duration, views, thumbnail, emoji, url } = req.body;

    
        const video = new Video({ title, category, duration, views, thumbnail, emoji, url });
        await video.save();
        res.status(201).json(video);
    } catch (error)  {
        console.error("Ошибка при создании видео: ", error);
        res.status(500).json({ 
            message: "Ошибка сервера", 
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});


export default router;
