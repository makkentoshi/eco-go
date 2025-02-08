import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organizer: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  participants: { type: Number, required: true },
  description: { type: String, required: true },
  emoji: { type: String, required: true },
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
