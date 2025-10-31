'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { Bot, Lightbulb, RefreshCw, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { evaluateBehavioralAction } from '@/lib/actions';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

const questions = [
  "Tell me about a time you had to deal with a difficult coworker.",
  "Describe a situation where you had to learn a new technology quickly.",
  "Walk me through a project you are particularly proud of.",
  "How do you handle tight deadlines and pressure?",
  "Give an example of a goal you set and how you achieved it.",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Evaluating...' : 'Get Feedback'}
    </Button>
  );
}

export default function BehavioralPracticePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [state, formAction] = useActionState(evaluateBehavioralAction, { message: '' });

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
    // You might want to reset the form state here
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Behavioral Question</CardTitle>
          <div className="flex items-center justify-between">
            <CardDescription>Practice your response to the question below.</CardDescription>
            <Button variant="ghost" size="icon" onClick={handleNextQuestion}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-6">
            <input type="hidden" name="question" value={currentQuestion} />
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-semibold">{currentQuestion}</p>
            </div>
            <Textarea
              name="answer"
              placeholder="Structure your answer using the STAR method (Situation, Task, Action, Result)..."
              className="min-h-64"
              required
            />
            {state.errors?.answer && <p className="text-sm text-destructive">{state.errors.answer}</p>}
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>AI Evaluation</CardTitle>
          <CardDescription>
            Here's a breakdown of your response.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
            {useFormStatus().pending ? (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            ) : state.data ? (
                <>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">Overall Score</h3>
                            <span className="text-lg font-bold text-primary">{state.data.overallScore}%</span>
                        </div>
                        <Progress value={state.data.overallScore} />
                    </div>
                    <FeedbackCard icon={ThumbsUp} title="Strengths" content={state.data.strengths} />
                    <FeedbackCard icon={ThumbsDown} title="Weaknesses" content={state.data.weaknesses} />
                    <FeedbackCard icon={Lightbulb} title="Suggestions" content={state.data.suggestions} />
                </>
            ) : (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg h-full">
                    <Bot className="h-10 w-10 mb-4" />
                    <p>Your evaluation will appear here after you submit an answer.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

function FeedbackCard({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) {
    return (
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-2 rounded-full">
            <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{content}</p>
        </div>
      </div>
    );
}
