export type Webhook = {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'error';
  eventTriggers: string[];
  payloadSettings: Record<string, any>;
  description: string;
  createdAt: string;
};

export type WebhookEvent = {
  id: string;
  webhookName: string;
  status: 'success' | 'failed';
  trigger: string;
  timestamp: string;
  details: string;
};

export type AlertRule = {
  id: string;
  name: string;
  webhookId: string;
  condition: string;
  channel: 'email' | 'sms' | 'slack';
  isEnabled: boolean;
};
