import { connectDB } from "../lib/db";
import { Question } from "../models/Question";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });


const sample = [
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    correctAnswer: "O(log n)",
    category: "DSA",
    difficulty: "Easy"
  },
  {
    question: "Tell me about yourself.",
    options: [],
    correctAnswer: "",
    category: "HR",
    difficulty: "Easy"
  }
];

async function seed() {
  await connectDB();
  await Question.insertMany(sample);
  console.log(" Seeded sample questions");
  process.exit(0);
}

seed();
