import { config } from 'dotenv';
config();

import '@/ai/flows/personalize-interview-questions.ts';
import '@/ai/flows/behavioral-question-evaluation.ts';
import '@/ai/flows/code-evaluation-feedback.ts';