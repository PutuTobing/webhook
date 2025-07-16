import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/dashboard/overview-tab";
import { WebhooksTab } from "@/components/dashboard/webhooks-tab";
import { MonitoringTab } from "@/components/dashboard/monitoring-tab";
import { AlertsTab } from "@/components/dashboard/alerts-tab";
import { BarChart3, ShieldAlert, List, Webhook } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
          <TabsTrigger value="overview">
            <List className="mr-2 size-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="webhooks">
            <Webhook className="mr-2 size-4" /> Webhooks
          </TabsTrigger>
          <TabsTrigger value="monitoring">
            <BarChart3 className="mr-2 size-4" /> Monitoring
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <ShieldAlert className="mr-2 size-4" /> Alerts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="webhooks">
          <WebhooksTab />
        </TabsContent>
        <TabsContent value="monitoring">
          <MonitoringTab />
        </TabsContent>
        <TabsContent value="alerts">
          <AlertsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
