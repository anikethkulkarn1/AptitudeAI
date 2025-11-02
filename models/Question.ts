import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuestion extends Document {
  question: string;
  options: string[];
  correctAnswer?: string;
  category: string;
  difficulty: string;
}

const QuestionSchema: Schema<IQuestion> = new Schema({
  question: { type: String, required: true },
  options: { type: [String], default: [] },
  correctAnswer: { type: String },
  category: { type: String, required: true },
  difficulty: { type: String, required: true }
});

export const Question: Model<IQuestion> =
  mongoose.models.Question || mongoose.model<IQuestion>("Question", QuestionSchema);
