"use client";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { webhookEvents } from "@/lib/data";

const chartData = Array.from({ length: 12 }, (_, i) => {
  const date = new Date();
  date.setHours(date.getHours() - (11 - i));
  return {
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    events: Math.floor(Math.random() * 200) + 50,
  };
});

const chartConfig = {
  events: {
    label: "Events",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MonitoringTab() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Event Trends</CardTitle>
          <CardDescription>
            Webhook event volume over the last 12 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <AreaChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 5)}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="events"
                type="natural"
                fill="var(--color-events)"
                fillOpacity={0.4}
                stroke="var(--color-events)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Events</CardTitle>
          <CardDescription>
            A real-time log of the latest webhook events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Webhook</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="hidden md:table-cell">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhookEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.webhookName}</TableCell>
                  <TableCell>
                    <Badge variant={event.status === "success" ? "secondary" : "destructive"}>
                      {event.status === 'success' ? 'Success' : 'Failed'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{event.trigger}</TableCell>
                  <TableCell>{new Date(event.timestamp).toLocaleTimeString()}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{event.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
