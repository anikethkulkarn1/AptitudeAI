'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { BrainCircuit, CheckCircle, Code, ListChecks, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { evaluateCodeAction } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Evaluating...' : 'Evaluate Code'}
    </Button>
  );
}

export default function CodePracticePage() {
  const [state, formAction] = useActionState(evaluateCodeAction, { message: '' });

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Code Evaluation</CardTitle>
          <CardDescription>
            Submit your code for a specific problem and get instant AI feedback on correctness, efficiency, and style.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="problemDescription">Problem Description</Label>
              <Textarea
                id="problemDescription"
                name="problemDescription"
                placeholder="e.g., Given an array of integers, return indices of the two numbers such that they add up to a specific target."
                required
              />
              {state.errors?.problemDescription && <p className="text-sm text-destructive">{state.errors.problemDescription}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Select name="language" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="c++">C++</SelectItem>
                </SelectContent>
              </Select>
               {state.errors?.language && <p className="text-sm text-destructive">{state.errors.language}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Your Code</Label>
              <Textarea
                id="code"
                name="code"
                placeholder="Paste your code here"
                className="font-code min-h-64"
                required
              />
               {state.errors?.code && <p className="text-sm text-destructive">{state.errors.code}</p>}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>AI Feedback</CardTitle>
          <CardDescription>
            Review the analysis of your code submission below.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {useFormStatus().pending ? (
            <>
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </>
          ) : state.data ? (
            <>
              <FeedbackCard icon={CheckCircle} title="Correctness" content={state.data.correctness} />
              <FeedbackCard icon={BrainCircuit} title="Efficiency" content={state.data.efficiency} />
              <FeedbackCard icon={Code} title="Style" content={state.data.style} />
              <FeedbackCard icon={ListChecks} title="Suggestions" content={state.data.suggestions} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg h-full">
              <Star className="h-10 w-10 mb-4" />
              <p>Your feedback will appear here once you submit your code.</p>
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
