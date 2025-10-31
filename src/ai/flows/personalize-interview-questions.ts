'use server';

/**
 * @fileOverview This file defines a Genkit flow to personalize interview questions based on the user's skill level and target job roles.
 *
 * - personalizeInterviewQuestions - A function that personalizes interview questions.
 * - PersonalizeInterviewQuestionsInput - The input type for the personalizeInterviewQuestions function.
 * - PersonalizeInterviewQuestionsOutput - The return type for the personalizeInterviewQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeInterviewQuestionsInputSchema = z.object({
  userSkillLevel: z
    .string()
    .describe('The skill level of the user (e.g., beginner, intermediate, expert).'),
  targetJobRoles: z
    .string()
    .describe('The target job roles of the user (e.g., software engineer, data scientist).'),
  interviewType: z
    .string()
    .describe('The type of interview questions desired (e.g., coding, behavioral, system design).'),
  numberOfQuestions: z
    .number()
    .describe('The number of interview questions to generate.'),
});
export type PersonalizeInterviewQuestionsInput = z.infer<
  typeof PersonalizeInterviewQuestionsInputSchema
>;

const PersonalizeInterviewQuestionsOutputSchema = z.object({
  personalizedQuestions: z
    .array(z.string())
    .describe('An array of personalized interview questions.'),
});
export type PersonalizeInterviewQuestionsOutput = z.infer<
  typeof PersonalizeInterviewQuestionsOutputSchema
>;

export async function personalizeInterviewQuestions(
  input: PersonalizeInterviewQuestionsInput
): Promise<PersonalizeInterviewQuestionsOutput> {
  return personalizeInterviewQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeInterviewQuestionsPrompt',
  input: {schema: PersonalizeInterviewQuestionsInputSchema},
  output: {schema: PersonalizeInterviewQuestionsOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized interview questions based on a user's skill level, target job roles, and desired interview type.

  Generate {{numberOfQuestions}} interview questions tailored to the following criteria:
  - User Skill Level: {{{userSkillLevel}}}
  - Target Job Roles: {{{targetJobRoles}}}
  - Interview Type: {{{interviewType}}}

  The generated questions should be relevant, challenging, and appropriate for the specified skill level and job roles.
  Each question should be distinct and cover a range of topics relevant to the interview type.

  Output the questions as a numbered list.
`,
});

const personalizeInterviewQuestionsFlow = ai.defineFlow(
  {
    name: 'personalizeInterviewQuestionsFlow',
    inputSchema: PersonalizeInterviewQuestionsInputSchema,
    outputSchema: PersonalizeInterviewQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
