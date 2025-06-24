import { useState, useEffect, useCallback, useMemo } from "react";
import { HeartPulse } from "lucide-react";
import { VitalSlider } from "./components/VitalSlider";
import { VitalsPresetButtons } from "./components/VitalsPresetButtons";
import { 
  type VitalName, 
  type VitalSign, 
  VITAL_PRESETS, 
  getNormalRanges, 
  createInitialVitalSigns 
} from "./utils/vitalsData";

interface InteractiveVitalsCardProps {
  onVitalsChange: (vitals: Record<VitalName, string>) => void;
  initialVitals?: Partial<Record<VitalName, string>>;
  patientAge?: number;
}

export function InteractiveVitalsCard({ 
  onVitalsChange, 
  initialVitals = {},
  patientAge = 30
}: InteractiveVitalsCardProps) {
  // Get normal ranges for the provided age
  const normalRanges = useMemo(() => getNormalRanges(patientAge), [patientAge]);

  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>(() => 
    createInitialVitalSigns(normalRanges, initialVitals)
  );

  // Apply preset vital signs
  const applyPreset = useCallback((preset: keyof typeof VITAL_PRESETS) => {
    const presetValues = VITAL_PRESETS[preset];
    if (!presetValues) return;

    setVitalSigns(prev => {
      return prev.map(vital => ({
        ...vital,
        value: presetValues[vital.name as keyof typeof presetValues] || vital.value
      }));
    });
  }, []);

  // Memoize the handleVitalChange function to prevent unnecessary re-renders
  const handleVitalChange = useCallback((index: number, values: number[]) => {
    const newValue = values[0];
    if (newValue === undefined) return;
    
    setVitalSigns(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], value: newValue };
      return updated;
    });
  }, []);

  // Debounced version of onVitalsChange to reduce state updates
  useEffect(() => {
    const timer = setTimeout(() => {
      // Convert vital signs to the format expected by parent component
      const vitalsObj: Record<string, string> = {};
      vitalSigns.forEach(vital => {
        vitalsObj[vital.name] = vital.value.toString();
      });
      onVitalsChange(vitalsObj);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [vitalSigns, onVitalsChange]);

  // Update initial values when they change
  useEffect(() => {
    if (Object.keys(initialVitals).length > 0) {
      setVitalSigns(prev => 
        prev.map(vital => {
          const initialValue = initialVitals[vital.name];
          return {
            ...vital,
            value: initialValue ? parseFloat(initialValue) : vital.value,
            range: normalRanges[vital.name as keyof typeof normalRanges]
          };
        })
      );
    }
  }, [initialVitals, normalRanges]);

  // Update ranges when patientAge changes
  useEffect(() => {
    setVitalSigns(prev => 
      prev.map(vital => ({
        ...vital,
        range: normalRanges[vital.name as keyof typeof normalRanges]
      }))
    );
  }, [normalRanges]);

  // Helper function to get vital sign safely
  const getVitalSign = (index: number): VitalSign | undefined => {
    return vitalSigns[index];
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-600/50 shadow-2xl"></div>
      <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-600/40 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <HeartPulse className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-slate-100">Interactive Vitals</h3>
          </div>
          <VitalsPresetButtons onApplyPreset={applyPreset} />
        </div>
        
        {/* Bentogrid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
          {/* Temperature - spans 2 columns on larger screens */}
          {getVitalSign(0) && (
            <VitalSlider 
              vital={getVitalSign(0)!} 
              index={0} 
              handleVitalChange={handleVitalChange}
              className="md:col-span-2"
            />
          )}
          
          {/* Heart Rate */}
          {getVitalSign(1) && (
            <VitalSlider 
              vital={getVitalSign(1)!} 
              index={1} 
              handleVitalChange={handleVitalChange}
            />
          )}
          
          {/* Respiratory Rate */}
          {getVitalSign(4) && (
            <VitalSlider 
              vital={getVitalSign(4)!} 
              index={4} 
              handleVitalChange={handleVitalChange}
            />
          )}
          
          {/* Systolic BP */}
          {getVitalSign(2) && (
            <VitalSlider 
              vital={getVitalSign(2)!} 
              index={2} 
              handleVitalChange={handleVitalChange}
            />
          )}
          
          {/* Diastolic BP */}
          {getVitalSign(3) && (
            <VitalSlider 
              vital={getVitalSign(3)!} 
              index={3} 
              handleVitalChange={handleVitalChange}
            />
          )}
          
          {/* Oxygen Saturation - spans 2 columns */}
          {getVitalSign(5) && (
            <VitalSlider 
              vital={getVitalSign(5)!} 
              index={5} 
              handleVitalChange={handleVitalChange}
              className="col-span-2"
            />
          )}
        </div>
      </div>
    </div>
  );
}
