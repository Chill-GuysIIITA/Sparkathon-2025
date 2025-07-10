'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Clock, User, Target } from 'lucide-react';

interface OrdersPanelProps {
  onSelectOrder: (order: any) => void;
  selectedOrder: any;
}

const mockOrders = [
  {
    id: 'ORD-001',
    status: 'picking',
    priority: 'high',
    items: ['Item-23-A', 'Item-45-B', 'Item-67-A'],
    picker: 'P1',
    estimatedTime: '3 min',
    progress: 67
  },
  {
    id: 'ORD-002',
    status: 'assigned',
    priority: 'medium',
    items: ['Item-12-A', 'Item-34-B'],
    picker: 'P2',
    estimatedTime: '2 min',
    progress: 0
  },
  {
    id: 'ORD-003',
    status: 'queued',
    priority: 'low',
    items: ['Item-56-A', 'Item-78-B', 'Item-90-A', 'Item-11-B'],
    picker: null,
    estimatedTime: '4 min',
    progress: 0
  },
  {
    id: 'ORD-004',
    status: 'completed',
    priority: 'high',
    items: ['Item-22-A', 'Item-33-B'],
    picker: 'P3',
    estimatedTime: '2 min',
    progress: 100
  }
];

export function OrdersPanel({ onSelectOrder, selectedOrder }: OrdersPanelProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'picking': return 'bg-walmart-blue text-white';
      case 'assigned': return 'bg-walmart-yellow text-black';
      case 'queued': return 'bg-gray-200 text-gray-800';
      case 'completed': return 'bg-green-500 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Order Queue</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedOrder?.id === order.id 
                  ? 'border-walmart-blue bg-walmart-blue/5' 
                  : 'border-border hover:border-walmart-blue/50'
              }`}
              onClick={() => onSelectOrder(order)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{order.id}</span>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className={getPriorityColor(order.priority)}>
                  {order.priority}
                </Badge>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{order.estimatedTime}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Target className="w-3 h-3" />
                  <span>{order.items.length} items</span>
                </div>
                {order.picker && (
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{order.picker}</span>
                  </div>
                )}
              </div>
              
              {order.progress > 0 && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-walmart-blue h-1 rounded-full transition-all duration-500"
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          View All Orders
        </Button>
      </CardContent>
    </Card>
  );
}