'use server';

import {
  personalizeInterviewQuestions,
  PersonalizeInterviewQuestionsInput,
  PersonalizeInterviewQuestionsOutput,
} from '@/ai/flows/personalize-interview-questions';
import {
  evaluateAnswer,
  BehavioralQuestionEvaluationInput,
  BehavioralQuestionEvaluationOutput,
} from '@/ai/flows/behavioral-question-evaluation';
import {
  codeEvaluationFeedback,
  CodeEvaluationFeedbackInput,
  CodeEvaluationFeedbackOutput,
} from '@/ai/flows/code-evaluation-feedback';
import { z } from 'zod';

// ====== Personalize Interview Questions ======
const PersonalizeSchema = z.object({
  userSkillLevel: z.string().min(1, 'Skill level is required.'),
  targetJobRoles: z.string().min(1, 'Target job role is required.'),
  interviewType: z.string().min(1, 'Interview type is required.'),
  numberOfQuestions: z.coerce.number().min(1).max(10),
});

type PersonalizeState = {
  message?: string;
  errors?: {
    [key in keyof PersonalizeInterviewQuestionsInput]?: string[];
  };
  data?: PersonalizeInterviewQuestionsOutput;
};

export async function generateQuestionsAction(
  prevState: PersonalizeState,
  formData: FormData
): Promise<PersonalizeState> {
  const validatedFields = PersonalizeSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
    };
  }

  try {
    const result = await personalizeInterviewQuestions(validatedFields.data);
    return { data: result, message: 'Questions generated successfully.' };
  } catch (e) {
    return { message: 'An error occurred while generating questions.' };
  }
}


// ====== Behavioral Question Evaluation ======
const BehavioralSchema = z.object({
    question: z.string(),
    answer: z.string().min(10, 'Answer must be at least 10 characters.'),
});

type BehavioralState = {
    message?: string;
    errors?: {
      [key in keyof BehavioralQuestionEvaluationInput]?: string[];
    };
    data?: BehavioralQuestionEvaluationOutput;
};

export async function evaluateBehavioralAction(
    prevState: BehavioralState,
    formData: FormData
): Promise<BehavioralState> {
    const validatedFields = BehavioralSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation failed. Please provide a longer answer.',
        };
    }

    try {
        const result = await evaluateAnswer(validatedFields.data);
        return { data: result, message: 'Evaluation complete.' };
    } catch (e) {
        return { message: 'An error occurred during evaluation.' };
    }
}


// ====== Code Evaluation ======
const CodeSchema = z.object({
    problemDescription: z.string().min(10, 'Problem description is too short.'),
    language: z.string().min(1, 'Please select a language.'),
    code: z.string().min(10, 'Code is too short to evaluate.'),
});

type CodeState = {
    message?: string;
    errors?: {
      [key in keyof CodeEvaluationFeedbackInput]?: string[];
    };
    data?: CodeEvaluationFeedbackOutput;
};

export async function evaluateCodeAction(
    prevState: CodeState,
    formData: FormData
): Promise<CodeState> {
    const validatedFields = CodeSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validation failed. Please check your inputs.',
        };
    }

    try {
        const result = await codeEvaluationFeedback(validatedFields.data);
        return { data: result, message: 'Code evaluation complete.' };
    } catch (e) {
        return { message: 'An error occurred during code evaluation.' };
    }
}
