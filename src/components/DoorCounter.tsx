import { Card } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle, DoorOpen } from "lucide-react";

/**
 * DoorCounter Component
 * Displays entry/exit counts for a single door with visual feedback
 */
interface DoorCounterProps {
  doorNumber: number;
  entries: number;
  exits: number;
  entryKey: string;
  exitKey: string;
  isActive?: boolean;
}

export const DoorCounter = ({ 
  doorNumber, 
  entries, 
  exits, 
  entryKey, 
  exitKey,
  isActive 
}: DoorCounterProps) => {
  const total = entries - exits;

  return (
    <Card className={`p-6 transition-all duration-300 border-2 ${
      isActive ? 'border-primary shadow-glow scale-105' : 'border-border'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <DoorOpen className="w-8 h-8 text-primary" />
          <h3 className="text-2xl font-bold text-foreground">Door {doorNumber}</h3>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Net Count</div>
          <div className="text-3xl font-bold text-primary">{total}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Entry Counter */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownCircle className="w-5 h-5 text-safe" />
            <span className="text-sm font-medium text-muted-foreground">Entries</span>
          </div>
          <div className="text-4xl font-bold text-safe">{entries}</div>
          <div className="text-xs text-muted-foreground mt-2">Press [{entryKey}]</div>
        </div>

        {/* Exit Counter */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpCircle className="w-5 h-5 text-alert" />
            <span className="text-sm font-medium text-muted-foreground">Exits</span>
          </div>
          <div className="text-4xl font-bold text-alert">{exits}</div>
          <div className="text-xs text-muted-foreground mt-2">Press [{exitKey}]</div>
        </div>
      </div>
    </Card>
  );
};
