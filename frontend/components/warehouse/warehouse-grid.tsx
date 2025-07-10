'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, User, Notebook as Robot, Target } from 'lucide-react';

interface WarehouseGridProps {
  isSimulationRunning: boolean;
  selectedOrder: any;
}

interface GridCell {
  type: 'shelf' | 'aisle' | 'picker' | 'robot' | 'item';
  id: string;
  items?: string[];
  pickerId?: string;
  robotId?: string;
}

export function WarehouseGrid({ isSimulationRunning, selectedOrder }: WarehouseGridProps) {
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [pickers, setPickers] = useState([
    { id: 'P1', x: 0, y: 0, status: 'picking', order: 'ORD-001' },
    { id: 'P2', x: 5, y: 3, status: 'moving', order: 'ORD-002' },
    { id: 'P3', x: 8, y: 7, status: 'idle', order: null }
  ]);

  useEffect(() => {
    // Initialize 10x10 grid
    const newGrid: GridCell[][] = [];
    for (let i = 0; i < 10; i++) {
      newGrid[i] = [];
      for (let j = 0; j < 10; j++) {
        if (i === 0 || i === 9 || j === 0 || j === 9) {
          newGrid[i][j] = { type: 'aisle', id: `aisle-${i}-${j}` };
        } else if (j % 2 === 0) {
          newGrid[i][j] = { type: 'aisle', id: `aisle-${i}-${j}` };
        } else {
          newGrid[i][j] = { 
            type: 'shelf', 
            id: `shelf-${i}-${j}`, 
            items: [`Item-${i}${j}-A`, `Item-${i}${j}-B`] 
          };
        }
      }
    }
    setGrid(newGrid);
  }, []);

  useEffect(() => {
    if (!isSimulationRunning) return;

    const interval = setInterval(() => {
      setPickers(prev => prev.map(picker => ({
        ...picker,
        x: Math.max(0, Math.min(9, picker.x + (Math.random() - 0.5) * 2)),
        y: Math.max(0, Math.min(9, picker.y + (Math.random() - 0.5) * 2))
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, [isSimulationRunning]);

  const getCellContent = (i: number, j: number) => {
    const cell = grid[i]?.[j];
    if (!cell) return null;

    const picker = pickers.find(p => Math.floor(p.x) === j && Math.floor(p.y) === i);
    
    if (picker) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="relative">
            <User className="w-4 h-4 text-walmart-blue" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      );
    }

    if (cell.type === 'shelf') {
      const isHighlighted = selectedOrder && cell.items?.some(item => 
        selectedOrder.items.includes(item)
      );
      
      return (
        <div className={`flex items-center justify-center h-full ${
          isHighlighted ? 'bg-walmart-yellow/20' : ''
        }`}>
          <Package className="w-3 h-3 text-muted-foreground" />
        </div>
      );
    }

    return null;
  };

  const getCellClassName = (i: number, j: number) => {
    const cell = grid[i]?.[j];
    if (!cell) return '';

    const base = 'border border-border transition-colors';
    
    switch (cell.type) {
      case 'shelf':
        return `${base} bg-muted/50 hover:bg-muted/70`;
      case 'aisle':
        return `${base} bg-background hover:bg-muted/20`;
      default:
        return base;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Warehouse Layout</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              <User className="w-3 h-3 mr-1" />
              {pickers.length} Pickers
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Package className="w-3 h-3 mr-1" />
              {grid.flat().filter(cell => cell.type === 'shelf').length} Shelves
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-10 gap-1 aspect-square max-w-[600px] mx-auto">
          {Array.from({ length: 100 }, (_, index) => {
            const i = Math.floor(index / 10);
            const j = index % 10;
            return (
              <div
                key={`${i}-${j}`}
                className={`aspect-square ${getCellClassName(i, j)}`}
              >
                {getCellContent(i, j)}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Shelf</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-background border"></div>
            <span>Aisle</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-walmart-blue" />
            <span>Picker</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}