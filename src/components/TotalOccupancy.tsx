import { Card } from "@/components/ui/card";
import { Users, AlertTriangle, ShieldCheck, AlertCircle } from "lucide-react";

/**
 * TotalOccupancy Component
 * Displays the total occupancy with status indicators
 * - Safe: 0-50 people (green)
 * - Warning: 51-80 people (yellow)
 * - Alert: 81+ people (red)
 */
interface TotalOccupancyProps {
  total: number;
  maxCapacity?: number;
}

export const TotalOccupancy = ({ total, maxCapacity = 100 }: TotalOccupancyProps) => {
  // Determine status based on occupancy percentage
  const getStatus = () => {
    const percentage = (total / maxCapacity) * 100;
    if (percentage >= 80) return 'alert';
    if (percentage >= 50) return 'warning';
    return 'safe';
  };

  const status = getStatus();
  
  const statusConfig = {
    safe: {
      color: 'text-safe',
      bgColor: 'bg-safe/10',
      borderColor: 'border-safe',
      shadow: 'shadow-glow',
      icon: ShieldCheck,
      label: 'SAFE CAPACITY'
    },
    warning: {
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning',
      shadow: 'shadow-glow-warning',
      icon: AlertTriangle,
      label: 'APPROACHING CAPACITY'
    },
    alert: {
      color: 'text-alert',
      bgColor: 'bg-alert/10',
      borderColor: 'border-alert',
      shadow: 'shadow-glow-alert',
      icon: AlertCircle,
      label: 'HIGH OCCUPANCY'
    }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card className={`p-8 ${config.borderColor} border-2 ${config.shadow} transition-all duration-500`}>
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className={`w-10 h-10 ${config.color}`} />
          <h2 className="text-3xl font-bold text-foreground">Total Occupancy</h2>
        </div>
        
        {/* Large occupancy number */}
        <div className={`text-9xl font-bold ${config.color} mb-4 transition-all duration-300 animate-in fade-in zoom-in`}>
          {total}
        </div>

        {/* Status indicator */}
        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${config.bgColor} ${config.borderColor} border-2`}>
          <StatusIcon className={`w-6 h-6 ${config.color}`} />
          <span className={`font-bold text-lg ${config.color}`}>{config.label}</span>
        </div>

        {/* Capacity bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Current: {total}</span>
            <span>Max: {maxCapacity}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                status === 'safe' ? 'bg-safe' : 
                status === 'warning' ? 'bg-warning' : 
                'bg-alert'
              }`}
              style={{ width: `${Math.min((total / maxCapacity) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
