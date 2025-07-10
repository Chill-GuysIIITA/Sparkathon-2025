'use client';

import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { WarehouseGrid } from '@/components/warehouse/warehouse-grid';
import { SimulationPanel } from '@/components/simulation/simulation-panel';
import { OrdersPanel } from '@/components/orders/orders-panel';
import { RouteComparisonModal } from '@/components/routes/route-comparison-modal';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [showRouteComparison, setShowRouteComparison] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === 'dashboard' && (
          <DashboardOverview 
            isSimulationRunning={isSimulationRunning}
            onShowRouteComparison={() => setShowRouteComparison(true)}
          />
        )}
        {activeTab === 'warehouse' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
            <div className="lg:col-span-3">
              <WarehouseGrid 
                isSimulationRunning={isSimulationRunning}
                selectedOrder={selectedOrder}
              />
            </div>
            <div className="space-y-4">
              <SimulationPanel 
                isRunning={isSimulationRunning}
                onToggle={() => setIsSimulationRunning(!isSimulationRunning)}
              />
              <OrdersPanel 
                onSelectOrder={setSelectedOrder}
                selectedOrder={selectedOrder}
              />
            </div>
          </div>
        )}
        
        <RouteComparisonModal 
          isOpen={showRouteComparison}
          onClose={() => setShowRouteComparison(false)}
        />
      </DashboardLayout>
      <Toaster />
    </ThemeProvider>
  );
}