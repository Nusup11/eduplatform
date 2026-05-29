import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: Number,
    maxScore: Number,
    percent: Number,
    passed: Boolean,
    mistakes: [String],
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.models.Result || mongoose.model('Result', resultSchema);
