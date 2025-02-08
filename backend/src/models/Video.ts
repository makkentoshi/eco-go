import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    views: { type: String, required: false },
    thumbnail: { type: String, required: true },
    emoji: { type: String, required: false },
    url: { type: String, required: true }
});

const Video = mongoose.model('Video', VideoSchema);
export default Video;
