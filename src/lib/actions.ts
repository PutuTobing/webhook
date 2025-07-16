'use server';

import {
  optimizeWebhookSettings,
  type OptimizeWebhookSettingsInput,
} from '@/ai/flows/optimize-webhook-settings';

type State = {
  message?: string;
  suggestions?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function getOptimizedSettings(
  prevState: State,
  formData: FormData
): Promise<State> {
  const rawFormData = {
    webhookUrl: formData.get('webhookUrl') as string,
    eventTriggers: formData.get('eventTriggers') as string,
    payloadString: formData.get('payloadString') as string,
    description: formData.get('description') as string,
  };

  const fieldErrors: Record<string, string> = {};
  if (!rawFormData.webhookUrl || !rawFormData.webhookUrl.startsWith('http')) {
    fieldErrors.webhookUrl = 'Please enter a valid URL.';
  }
   if (!rawFormData.eventTriggers) {
    fieldErrors.eventTriggers = 'Please enter at least one event trigger.';
  }
   if (!rawFormData.payloadString) {
    fieldErrors.payloadString = 'Please provide payload settings JSON.';
  }

  let payloadSettings = {};
  try {
    payloadSettings = JSON.parse(rawFormData.payloadString);
  } catch (e) {
    fieldErrors.payloadString = 'Invalid JSON format.';
  }
  
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    const input: OptimizeWebhookSettingsInput = {
      webhookUrl: rawFormData.webhookUrl,
      eventTriggers: rawFormData.eventTriggers.split(',').map((s) => s.trim()).filter(Boolean),
      payloadSettings,
      description: rawFormData.description,
    };

    const result = await optimizeWebhookSettings(input);
    return {
      message: `Analysis Complete (Confidence: ${(
        result.confidenceLevel * 100
      ).toFixed(0)}%)`,
      suggestions: result.suggestedImprovements,
    };
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred while analyzing settings. Please try again later.' };
  }
}
