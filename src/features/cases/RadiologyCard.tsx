import React, { useState, useCallback } from "react";
import { Button } from "@/shared/components/button";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X, FileText } from "lucide-react";
import type { RadiologyStudy } from "@/shared/types/case";
import { RadiologyStudyItem } from "./components/RadiologyStudyItem";
import { AddRadiologyForm } from "./components/AddRadiologyForm";
import { createRadiologyStudy } from "./utils/radiologyData";

interface RadiologyCardProps {
  onRadiologyChange?: (studies: RadiologyStudy[]) => void;
  initialStudies?: RadiologyStudy[];
}

export const RadiologyCard: React.FC<RadiologyCardProps> = ({
  onRadiologyChange,
  initialStudies = [],
}) => {
  const [studies, setStudies] = useState<RadiologyStudy[]>(initialStudies);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<string>("");
  const [findings, setFindings] = useState("");
  const [customStudy, setCustomStudy] = useState({ name: "", type: "" });
  const [selectedFinding, setSelectedFinding] = useState("");

  const handleAddStudy = useCallback(() => {
    if (!selectedStudy && !customStudy.name) return;

    const newStudy = createRadiologyStudy(
      selectedStudy,
      findings,
      customStudy,
      selectedFinding
    );

    const updatedStudies = [...studies, newStudy];
    setStudies(updatedStudies);
    if (onRadiologyChange) {
      onRadiologyChange(updatedStudies);
    }

    // Reset form
    setSelectedStudy("");
    setFindings("");
    setCustomStudy({ name: "", type: "" });
    setSelectedFinding("");
    setShowAddForm(false);
  }, [studies, selectedStudy, findings, customStudy, selectedFinding, onRadiologyChange]);

  const handleRemoveStudy = useCallback((id: string) => {
    const updatedStudies = studies.filter(study => study.id !== id);
    setStudies(updatedStudies);
    if (onRadiologyChange) {
      onRadiologyChange(updatedStudies);
    }
  }, [studies, onRadiologyChange]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
        <div className="pb-4 pt-6 px-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-white/80" />
            Radiology Studies
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 bg-white/10 border-white/20 hover:bg-white/20 text-white"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? (
              <X className="h-4 w-4 mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            {showAddForm ? "Cancel" : "Add Study"}
          </Button>
        </div>
        <div className="p-6 space-y-4">
          <AnimatePresence mode="wait">
            {showAddForm && (
              <AddRadiologyForm
                selectedStudy={selectedStudy}
                setSelectedStudy={setSelectedStudy}
                findings={findings}
                setFindings={setFindings}
                customStudy={customStudy}
                setCustomStudy={setCustomStudy}
                selectedFinding={selectedFinding}
                setSelectedFinding={setSelectedFinding}
                onAdd={handleAddStudy}
                onCancel={() => setShowAddForm(false)}
              />
            )}
          </AnimatePresence>
          <div className="space-y-3">
            <AnimatePresence>
              {studies.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white/70 text-sm"
                >
                  No radiology studies added yet.
                </motion.div>
              )}
              {studies.map((study) => (
                <RadiologyStudyItem 
                  key={study.id} 
                  study={study} 
                  onRemove={handleRemoveStudy}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
