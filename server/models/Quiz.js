import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['single', 'multiple', 'timed', 'drag-drop', 'matching', 'practice'],
  },
  text: String,
  options: [String],
  correctAnswers: [String],
  points: { type: Number, default: 10 },
});

const quizSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    title: String,
    questions: [questionSchema],
    timer: Number,
    passingScore: { type: Number, default: 70 },
  },
  { timestamps: true },
);

export default mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
