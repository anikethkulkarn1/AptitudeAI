'use server';

/**
 * @fileOverview Evaluates user answers to behavioral interview questions using AI.
 *
 * - evaluateAnswer - A function to evaluate a user's answer to a behavioral question.
 * - BehavioralQuestionEvaluationInput - The input type for the evaluateAnswer function.
 * - BehavioralQuestionEvaluationOutput - The return type for the evaluateAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BehavioralQuestionEvaluationInputSchema = z.object({
  question: z.string().describe('The behavioral question asked in the interview.'),
  answer: z.string().describe('The user\u2019s answer to the behavioral question.'),
});
export type BehavioralQuestionEvaluationInput = z.infer<
  typeof BehavioralQuestionEvaluationInputSchema
>;

const BehavioralQuestionEvaluationOutputSchema = z.object({
  strengths: z.string().describe('Identified strengths in the user\u2019s answer.'),
  weaknesses: z.string().describe('Identified weaknesses in the user\u2019s answer.'),
  overallScore: z
    .number()
    .describe('An overall score (0-100) representing the quality of the answer.'),
  suggestions: z
    .string()
    .describe('Suggestions for improving the answer in the future.'),
});
export type BehavioralQuestionEvaluationOutput = z.infer<
  typeof BehavioralQuestionEvaluationOutputSchema
>;

export async function evaluateAnswer(
  input: BehavioralQuestionEvaluationInput
): Promise<BehavioralQuestionEvaluationOutput> {
  return behavioralQuestionEvaluationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'behavioralQuestionEvaluationPrompt',
  input: {schema: BehavioralQuestionEvaluationInputSchema},
  output: {schema: BehavioralQuestionEvaluationOutputSchema},
  prompt: `You are an AI-powered interview coach specializing in evaluating responses to behavioral interview questions.

  Evaluate the following answer to the behavioral question provided. Provide feedback on strengths, weaknesses, an overall score (0-100), and suggestions for improvement.

  Question: {{{question}}}
  Answer: {{{answer}}}

  Format your response as a JSON object with the following keys:
  - strengths: Identified strengths in the user\u2019s answer.
  - weaknesses: Identified weaknesses in the user\u2019s answer.
  - overallScore: An overall score (0-100) representing the quality of the answer.
  - suggestions: Suggestions for improving the answer in the future.`,
});

const behavioralQuestionEvaluationFlow = ai.defineFlow(
  {
    name: 'behavioralQuestionEvaluationFlow',
    inputSchema: BehavioralQuestionEvaluationInputSchema,
    outputSchema: BehavioralQuestionEvaluationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
