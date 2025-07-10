'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Settings, Clock } from 'lucide-react';

interface SimulationPanelProps {
  isRunning: boolean;
  onToggle: () => void;
}

export function SimulationPanel({ isRunning, onToggle }: SimulationPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Simulation Control</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status</span>
          <Badge variant={isRunning ? "default" : "secondary"}>
            {isRunning ? 'Running' : 'Paused'}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Simulation Time</span>
          <div className="flex items-center space-x-1 text-sm">
            <Clock className="w-3 h-3" />
            <span>14:32:18</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Speed</span>
          <span className="text-sm">2x</span>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={onToggle}
            className="w-full"
            variant={isRunning ? "secondary" : "default"}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>
          
          <Button variant="outline" className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="font-medium text-sm mb-2">Live Stats</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Active Pickers:</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span>Completed Orders:</span>
              <span className="font-medium">247</span>
            </div>
            <div className="flex justify-between">
              <span>Avg. Pick Time:</span>
              <span className="font-medium">2.3 min</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}