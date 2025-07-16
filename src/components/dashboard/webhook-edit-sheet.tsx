"use client";
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Webhook } from "@/lib/types";
import { getOptimizedSettings } from "@/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Download } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface WebhookEditSheetProps {
  webhook: Webhook;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const initialState = {
  message: '',
  suggestions: '',
  error: '',
  fieldErrors: {}
};

export function WebhookEditSheet({ webhook, isOpen, onOpenChange }: WebhookEditSheetProps) {
  const [state, formAction] = useFormState(getOptimizedSettings, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: state.error,
      });
    }
  }, [state, toast]);

  const handleDownload = () => {
    if (!state.suggestions) return;
    const blob = new Blob([state.suggestions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-suggestions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline">Edit Webhook</SheetTitle>
          <SheetDescription>
            Update your webhook settings and get AI-powered optimizations.
          </SheetDescription>
        </SheetHeader>
        <form action={formAction} className="flex-1 flex flex-col gap-4 overflow-y-auto pr-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="webhookName">Webhook Name</Label>
            <Input id="webhookName" defaultValue={webhook.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input id="webhookUrl" name="webhookUrl" defaultValue={webhook.url} />
             {state?.fieldErrors?.webhookUrl && <p className="text-sm text-destructive">{state.fieldErrors.webhookUrl}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventTriggers">Event Triggers (comma-separated)</Label>
            <Input id="eventTriggers" name="eventTriggers" defaultValue={webhook.eventTriggers.join(", ")} />
            {state?.fieldErrors?.eventTriggers && <p className="text-sm text-destructive">{state.fieldErrors.eventTriggers}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="payloadString">Payload Settings (JSON)</Label>
            <Textarea
              id="payloadString"
              name="payloadString"
              className="font-code"
              rows={5}
              defaultValue={JSON.stringify(webhook.payloadSettings, null, 2)}
            />
            {state?.fieldErrors?.payloadString && <p className="text-sm text-destructive">{state.fieldErrors.payloadString}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} defaultValue={webhook.description} />
          </div>

          {state?.suggestions && (
             <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>{state.message}</AlertTitle>
              <AlertDescription className="whitespace-pre-wrap font-mono text-xs">
                {state.suggestions}
              </AlertDescription>
            </Alert>
          )}

           <SheetFooter className="mt-auto pt-4 bg-background sticky bottom-0 flex-col sm:flex-row sm:justify-between sm:items-center">
             <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full sm:w-auto">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Optimize with AI
                </Button>
                <Button variant="outline" className="w-full sm:w-auto">Save Changes</Button>
             </div>
             <Button 
                variant="secondary" 
                className="w-full sm:w-auto" 
                onClick={handleDownload}
                disabled={!state.suggestions}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
