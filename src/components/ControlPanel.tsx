import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Info } from "lucide-react";
import { useState } from "react";

/**
 * ControlPanel Component
 * Provides controls and instructions for the counter system
 */
interface ControlPanelProps {
  onReset: () => void;
}

export const ControlPanel = ({ onReset }: ControlPanelProps) => {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <Card className="p-6 border-2 border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Info className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Control Panel</h3>
        </div>
        <Button
          onClick={onReset}
          variant="outline"
          className="gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </Button>
      </div>

      <div className="space-y-4">
        {/* Instructions Toggle */}
        <Button
          onClick={() => setShowInstructions(!showInstructions)}
          variant="secondary"
          className="w-full"
        >
          {showInstructions ? 'Hide' : 'Show'} Keyboard Instructions
        </Button>

        {/* Instructions */}
        {showInstructions && (
          <div className="bg-secondary/30 rounded-lg p-4 space-y-3 border border-border">
            <h4 className="font-semibold text-foreground mb-3">Keyboard Controls:</h4>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-card/50 p-3 rounded">
                <div className="font-mono font-bold text-safe mb-1">[1]</div>
                <div className="text-muted-foreground">Door 1 Entry</div>
              </div>
              <div className="bg-card/50 p-3 rounded">
                <div className="font-mono font-bold text-alert mb-1">[Q]</div>
                <div className="text-muted-foreground">Door 1 Exit</div>
              </div>
              
              <div className="bg-card/50 p-3 rounded">
                <div className="font-mono font-bold text-safe mb-1">[2]</div>
                <div className="text-muted-foreground">Door 2 Entry</div>
              </div>
              <div className="bg-card/50 p-3 rounded">
                <div className="font-mono font-bold text-alert mb-1">[W]</div>
                <div className="text-muted-foreground">Door 2 Exit</div>
              </div>
              
              <div className="bg-card/50 p-3 rounded">
                <div className="font-mono font-bold text-safe mb-1">[3]</div>
                <div className="text-muted-foreground">Door 3 Entry</div>
              </div>
              <div className="bg-card/50 p-3 rounded">
                <div className="font-mono font-bold text-alert mb-1">[E]</div>
                <div className="text-muted-foreground">Door 3 Exit</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-primary/10 border border-primary rounded text-sm">
              <p className="text-foreground">
                <strong>Note:</strong> Total occupancy cannot go below 0. Each door tracks entries and exits independently.
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
