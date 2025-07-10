'use client';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, TrendingDown, TrendingUp } from 'lucide-react';

interface RouteComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const baselineRoute = {
  title: 'Baseline Route',
  totalTime: '4.2 min',
  totalDistance: '127 m',
  steps: [
    { location: 'A1-2', item: 'Item-23-A', time: '0:45', distance: '23m' },
    { location: 'C5-3', item: 'Item-45-B', time: '1:30', distance: '45m' },
    { location: 'B8-1', item: 'Item-67-A', time: '2:05', distance: '59m' },
  ],
  efficiency: 72
};

const optimizedRoute = {
  title: 'AI-Optimized Route',
  totalTime: '2.8 min',
  totalDistance: '89 m',
  steps: [
    { location: 'A1-2', item: 'Item-23-A', time: '0:45', distance: '23m' },
    { location: 'B8-1', item: 'Item-67-A', time: '1:15', distance: '31m' },
    { location: 'C5-3', item: 'Item-45-B', time: '0:50', distance: '35m' },
  ],
  efficiency: 94
};

export function RouteComparisonModal({ isOpen, onClose }: RouteComparisonModalProps) {
  const timeSaved = parseFloat(baselineRoute.totalTime) - parseFloat(optimizedRoute.totalTime);
  const distanceSaved = parseInt(baselineRoute.totalDistance) - parseInt(optimizedRoute.totalDistance);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Route Comparison Analysis</DialogTitle>
          <DialogDescription>
            Compare baseline vs AI-optimized picking routes for Order ORD-001
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{baselineRoute.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Time:</span>
                  <Badge variant="outline">{baselineRoute.totalTime}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Distance:</span>
                  <Badge variant="outline">{baselineRoute.totalDistance}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Efficiency:</span>
                  <Badge variant="secondary">{baselineRoute.efficiency}%</Badge>
                </div>
                
                <div className="space-y-3 pt-4">
                  <h4 className="font-medium text-sm">Route Steps:</h4>
                  {baselineRoute.steps.map((step, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-walmart-blue text-white px-2 py-1 rounded">
                          {index + 1}
                        </span>
                        <div>
                          <div className="text-sm font-medium">{step.location}</div>
                          <div className="text-xs text-muted-foreground">{step.item}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs">{step.time}</div>
                        <div className="text-xs text-muted-foreground">{step.distance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-walmart-blue">{optimizedRoute.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Time:</span>
                  <Badge className="bg-green-100 text-green-800">{optimizedRoute.totalTime}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Distance:</span>
                  <Badge className="bg-green-100 text-green-800">{optimizedRoute.totalDistance}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Efficiency:</span>
                  <Badge className="bg-walmart-blue text-white">{optimizedRoute.efficiency}%</Badge>
                </div>
                
                <div className="space-y-3 pt-4">
                  <h4 className="font-medium text-sm">Route Steps:</h4>
                  {optimizedRoute.steps.map((step, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-walmart-blue text-white px-2 py-1 rounded">
                          {index + 1}
                        </span>
                        <div>
                          <div className="text-sm font-medium">{step.location}</div>
                          <div className="text-xs text-muted-foreground">{step.item}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs">{step.time}</div>
                        <div className="text-xs text-muted-foreground">{step.distance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Time Saved</p>
                  <p className="text-2xl font-bold text-green-600">{timeSaved.toFixed(1)} min</p>
                </div>
                <TrendingDown className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Distance Saved</p>
                  <p className="text-2xl font-bold text-green-600">{distanceSaved}m</p>
                </div>
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Efficiency Gain</p>
                  <p className="text-2xl font-bold text-walmart-blue">+{optimizedRoute.efficiency - baselineRoute.efficiency}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-walmart-blue" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-walmart-blue hover:bg-walmart-blue/90">
            Apply Route
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}