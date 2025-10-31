'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Clipboard, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateQuestionsAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : 'Generate Questions'}
    </Button>
  );
}

export default function InterviewToolPage() {
  const [state, formAction] = useActionState(generateQuestionsAction, { message: '' });
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      description: 'The questions have been copied successfully.',
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Interview Tool</CardTitle>
          <CardDescription>
            Tailor interview questions to your skill level and career goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="userSkillLevel">Your Skill Level</Label>
              <Select name="userSkillLevel" required>
                <SelectTrigger><SelectValue placeholder="Select skill level" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="targetJobRoles">Target Job Role</Label>
              <Input id="targetJobRoles" name="targetJobRoles" placeholder="e.g., Frontend Developer, Data Scientist" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interviewType">Interview Type</Label>
              <Select name="interviewType" required>
                <SelectTrigger><SelectValue placeholder="Select interview type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="coding">Coding</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="system design">System Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="numberOfQuestions">Number of Questions</Label>
              <Input id="numberOfQuestions" name="numberOfQuestions" type="number" defaultValue={5} min={1} max={10} required />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Generated Questions</CardTitle>
              <CardDescription>
                Here are your personalized interview questions.
              </CardDescription>
            </div>
            {state.data && (
                <Button variant="outline" size="icon" onClick={() => handleCopy(state.data?.personalizedQuestions.join('\n') || '')}>
                    <Clipboard className="h-4 w-4" />
                </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {useFormStatus().pending ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/6" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : state.data ? (
            <ul className="space-y-3 list-decimal list-inside text-sm text-muted-foreground">
              {state.data.personalizedQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg h-full">
              <Sparkles className="h-10 w-10 mb-4" />
              <p>Your generated questions will appear here.</p>
            </div>
          )}
          {state.message && !state.data && <p className="text-sm text-destructive mt-4 text-center">{state.message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
