'use server';

/**
 * @fileOverview A code evaluation feedback AI agent.
 *
 * - codeEvaluationFeedback - A function that handles the code evaluation and feedback process.
 * - CodeEvaluationFeedbackInput - The input type for the codeEvaluationFeedback function.
 * - CodeEvaluationFeedbackOutput - The return type for the codeEvaluationFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeEvaluationFeedbackInputSchema = z.object({
  code: z.string().describe('The code to be evaluated.'),
  language: z.string().describe('The programming language of the code.'),
  problemDescription: z.string().describe('The description of the coding problem.'),
});
export type CodeEvaluationFeedbackInput = z.infer<typeof CodeEvaluationFeedbackInputSchema>;

const CodeEvaluationFeedbackOutputSchema = z.object({
  correctness: z.string().describe('An evaluation of the correctness of the code.'),
  efficiency: z.string().describe('An evaluation of the efficiency of the code.'),
  style: z.string().describe('An evaluation of the style of the code.'),
  suggestions: z.string().describe('Suggestions for improving the code.'),
});
export type CodeEvaluationFeedbackOutput = z.infer<typeof CodeEvaluationFeedbackOutputSchema>;

export async function codeEvaluationFeedback(input: CodeEvaluationFeedbackInput): Promise<CodeEvaluationFeedbackOutput> {
  return codeEvaluationFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeEvaluationFeedbackPrompt',
  input: {schema: CodeEvaluationFeedbackInputSchema},
  output: {schema: CodeEvaluationFeedbackOutputSchema},
  prompt: `You are an expert software engineer providing feedback on code solutions.

You will evaluate the code based on its correctness, efficiency, and style.
Provide specific suggestions for improvement.

Problem Description: {{{problemDescription}}}
Language: {{{language}}}
Code:
\\\`\`\`{{{language}}}
{{{code}}}
\\\`\`\`
`,
});

const codeEvaluationFeedbackFlow = ai.defineFlow(
  {
    name: 'codeEvaluationFeedbackFlow',
    inputSchema: CodeEvaluationFeedbackInputSchema,
    outputSchema: CodeEvaluationFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
