"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
var mongoose_1 = require("mongoose");
var QuestionSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    options: { type: [String], default: [] },
    correctAnswer: { type: String },
    category: { type: String, required: true },
    difficulty: { type: String, required: true }
});
exports.Question = mongoose_1.default.models.Question || mongoose_1.default.model("Question", QuestionSchema);
