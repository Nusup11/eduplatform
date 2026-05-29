import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  videoUrl: String,
  order: Number,
});

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lessons: [lessonSchema],
  },
  { timestamps: true },
);

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
