import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  username: String,
  course: String,
  certificateId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Certificate', certificateSchema);
