import { useState, useEffect, useCallback } from "react";
import { DoorCounter } from "@/components/DoorCounter";
import { TotalOccupancy } from "@/components/TotalOccupancy";
import { ControlPanel } from "@/components/ControlPanel";
import { toast } from "sonner";
import { Flame } from "lucide-react";

/**
 * Fire and Safety People Counter System
 * Main dashboard for tracking occupancy across 3 doors
 * 
 * Features:
 * - Real-time entry/exit tracking for 3 doors
 * - Total occupancy calculation
 * - Keyboard controls for simulation
 * - Visual status indicators (safe/warning/alert)
 * - Prevents negative occupancy counts
 */

interface DoorData {
  entries: number;
  exits: number;
}

const Index = () => {
  // State for each door's entry/exit counts
  const [door1, setDoor1] = useState<DoorData>({ entries: 0, exits: 0 });
  const [door2, setDoor2] = useState<DoorData>({ entries: 0, exits: 0 });
  const [door3, setDoor3] = useState<DoorData>({ entries: 0, exits: 0 });
  
  // Track which door was last activated for visual feedback
  const [activeDoor, setActiveDoor] = useState<number | null>(null);

  /**
   * Calculate total occupancy across all doors
   * Formula: (entries - exits) for all doors combined
   * Minimum value is clamped to 0
   */
  const getTotalOccupancy = useCallback(() => {
    const total = (door1.entries - door1.exits) + 
                  (door2.entries - door2.exits) + 
                  (door3.entries - door3.exits);
    return Math.max(0, total); // Prevent negative occupancy
  }, [door1, door2, door3]);

  /**
   * Handle entry for a specific door
   * Increments the entry count and shows toast notification
   */
  const handleEntry = (doorNumber: number) => {
    setActiveDoor(doorNumber);
    setTimeout(() => setActiveDoor(null), 300);

    switch (doorNumber) {
      case 1:
        setDoor1(prev => ({ ...prev, entries: prev.entries + 1 }));
        break;
      case 2:
        setDoor2(prev => ({ ...prev, entries: prev.entries + 1 }));
        break;
      case 3:
        setDoor3(prev => ({ ...prev, entries: prev.entries + 1 }));
        break;
    }
    toast.success(`Door ${doorNumber}: Person entered`, {
      duration: 2000,
    });
  };

  /**
   * Handle exit for a specific door
   * Increments the exit count only if it won't make total occupancy negative
   */
  const handleExit = (doorNumber: number) => {
    const currentTotal = getTotalOccupancy();
    
    // Prevent exit if occupancy is already at 0
    if (currentTotal <= 0) {
      toast.error("Cannot exit: Occupancy is already at 0", {
        duration: 2000,
      });
      return;
    }

    setActiveDoor(doorNumber);
    setTimeout(() => setActiveDoor(null), 300);

    switch (doorNumber) {
      case 1:
        setDoor1(prev => ({ ...prev, exits: prev.exits + 1 }));
        break;
      case 2:
        setDoor2(prev => ({ ...prev, exits: prev.exits + 1 }));
        break;
      case 3:
        setDoor3(prev => ({ ...prev, exits: prev.exits + 1 }));
        break;
    }
    toast.info(`Door ${doorNumber}: Person exited`, {
      duration: 2000,
    });
  };

  /**
   * Reset all counters to zero
   */
  const handleReset = () => {
    setDoor1({ entries: 0, exits: 0 });
    setDoor2({ entries: 0, exits: 0 });
    setDoor3({ entries: 0, exits: 0 });
    toast.success("All counters reset", {
      duration: 2000,
    });
  };

  /**
   * Keyboard event listener for door controls
   * Keys: 1,2,3 for entries | Q,W,E for exits
   */
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      switch (key) {
        // Door 1
        case '1':
          handleEntry(1);
          break;
        case 'q':
          handleExit(1);
          break;
        // Door 2
        case '2':
          handleEntry(2);
          break;
        case 'w':
          handleExit(2);
          break;
        // Door 3
        case '3':
          handleEntry(3);
          break;
        case 'e':
          handleExit(3);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [door1, door2, door3]); // Re-attach listener when door states change

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Flame className="w-12 h-12 text-primary" />
          <h1 className="text-5xl font-bold text-foreground">Fire & Safety Monitor</h1>
        </div>
        <p className="text-center text-muted-foreground text-lg">
          Real-time Occupancy Tracking System
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Total Occupancy Display */}
        <TotalOccupancy total={getTotalOccupancy()} maxCapacity={100} />

        {/* Door Counters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DoorCounter 
            doorNumber={1} 
            entries={door1.entries} 
            exits={door1.exits}
            entryKey="1"
            exitKey="Q"
            isActive={activeDoor === 1}
          />
          <DoorCounter 
            doorNumber={2} 
            entries={door2.entries} 
            exits={door2.exits}
            entryKey="2"
            exitKey="W"
            isActive={activeDoor === 2}
          />
          <DoorCounter 
            doorNumber={3} 
            entries={door3.entries} 
            exits={door3.exits}
            entryKey="3"
            exitKey="E"
            isActive={activeDoor === 3}
          />
        </div>

        {/* Control Panel */}
        <ControlPanel onReset={handleReset} />
      </div>
    </div>
  );
};

export default Index;
