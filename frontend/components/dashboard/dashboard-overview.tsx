'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Target,
  Play,
  BarChart3
} from 'lucide-react';
import { MetricsChart } from './metrics-chart';
import { HeatmapChart } from './heatmap-chart';

interface DashboardOverviewProps {
  isSimulationRunning: boolean;
  onShowRouteComparison: () => void;
}

export function DashboardOverview({ isSimulationRunning, onShowRouteComparison }: DashboardOverviewProps) {
  const kpis = [
    {
      title: 'Avg. Pick Time',
      value: '2.3 min',
      change: '-12%',
      trend: 'down',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Orders/Hour',
      value: '847',
      change: '+23%',
      trend: 'up',
      icon: Package,
      color: 'text-walmart-blue'
    },
    {
      title: 'Efficiency Score',
      value: '94.2%',
      change: '+8%',
      trend: 'up',
      icon: Target,
      color: 'text-walmart-yellow'
    },
    {
      title: 'Active Pickers',
      value: '24',
      change: '0%',
      trend: 'stable',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Delayed Orders',
      value: '12',
      change: '-45%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'Queue Length',
      value: '156',
      change: '-18%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Warehouse Dashboard</h1>
          <p className="text-muted-foreground">Real-time optimization analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={isSimulationRunning ? "default" : "secondary"}>
            {isSimulationRunning ? 'Simulation Running' : 'Simulation Paused'}
          </Badge>
          <Button onClick={onShowRouteComparison} variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Compare Routes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center mt-1">
                  <Badge 
                    variant={kpi.trend === 'up' ? 'default' : kpi.trend === 'down' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {kpi.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">vs last hour</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Before vs After Optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <MetricsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demand Heatmap</CardTitle>
            <CardDescription>Item picking frequency zones</CardDescription>
          </CardHeader>
          <CardContent>
            <HeatmapChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}