import type { Webhook, WebhookEvent, AlertRule } from '@/lib/types';

export const webhooks: Webhook[] = [
  {
    id: 'wh_1',
    name: 'Customer Orders Webhook',
    url: 'https://api.example.com/webhooks/12345',
    status: 'active',
    eventTriggers: ['order.created', 'order.updated'],
    payloadSettings: { include_customer_details: true, version: '2.0' },
    description: 'Handles new and updated customer orders.',
    createdAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'wh_2',
    name: 'Inventory Sync',
    url: 'https://api.storefront.com/inventory/sync',
    status: 'inactive',
    eventTriggers: ['product.updated', 'stock.changed'],
    payloadSettings: { fields: ['sku', 'quantity'] },
    description: 'Syncs inventory levels with our storefront.',
    createdAt: '2023-10-25T14:30:00Z',
  },
  {
    id: 'wh_3',
    name: 'User Authentication',
    url: 'https://auth.internal/notify/user-event',
    status: 'error',
    eventTriggers: ['user.login', 'user.logout', 'user.failed_login'],
    payloadSettings: { secure_mode: true },
    description: 'Notifies security systems of user authentication events.',
    createdAt: '2023-10-24T09:00:00Z',
  },
  {
    id: 'wh_4',
    name: 'CRM Update Hook',
    url: 'https://crm-provider.com/api/v2/hooks/contact',
    status: 'active',
    eventTriggers: ['contact.created', 'contact.updated'],
    payloadSettings: { custom_fields: true },
    description: 'Updates contacts in our CRM.',
    createdAt: '2023-10-23T18:00:00Z',
  },
];

export const webhookEvents: WebhookEvent[] = [
  { id: 'evt_1', webhookName: 'Customer Orders Webhook', status: 'success', trigger: 'order.created', timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(), details: 'Payload delivered successfully.' },
  { id: 'evt_2', webhookName: 'User Authentication', status: 'failed', trigger: 'user.failed_login', timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), details: 'Endpoint returned 503 Service Unavailable.' },
  { id: 'evt_3', webhookName: 'CRM Update Hook', status: 'success', trigger: 'contact.updated', timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), details: 'Payload delivered successfully.' },
  { id: 'evt_4', webhookName: 'Customer Orders Webhook', status: 'success', trigger: 'order.updated', timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), details: 'Payload delivered successfully.' },
  { id: 'evt_5', webhookName: 'User Authentication', status: 'success', trigger: 'user.login', timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(), details: 'Payload delivered successfully.' },
  { id: 'evt_6', webhookName: 'User Authentication', status: 'failed', trigger: 'user.failed_login', timestamp: new Date(Date.now() - 22 * 60 * 1000).toISOString(), details: 'Connection timed out after 15 seconds.' },
];


export const alertRules: AlertRule[] = [
    { id: 'alert_1', name: 'Critical Failure Alert', webhookId: 'wh_3', condition: 'If status is failed 3 times in 5 minutes', channel: 'email', isEnabled: true },
    { id: 'alert_2', name: 'Slack Order Notifications', webhookId: 'wh_1', condition: 'On every successful event', channel: 'slack', isEnabled: true },
    { id: 'alert_3', name: 'Inactive Webhook SMS', webhookId: 'wh_2', condition: 'If status is inactive for > 24 hours', channel: 'sms', isEnabled: false },
];
