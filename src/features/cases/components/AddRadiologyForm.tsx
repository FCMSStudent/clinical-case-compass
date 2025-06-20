
import React from "react";
import { Input } from "@/shared/components/input";
import { Label } from "@/shared/components/label";
import { Button } from "@/shared/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/select";
import { Textarea } from "@/shared/components/textarea";
import { motion } from "framer-motion";
import { COMMON_RADIOLOGY_STUDIES, STUDY_TYPES } from "../utils/radiologyData";

interface AddRadiologyFormProps {
  selectedStudy: string;
  setSelectedStudy: (value: string) => void;
  findings: string;
  setFindings: (value: string) => void;
  customStudy: { name: string; type: string };
  setCustomStudy: (value: { name: string; type: string }) => void;
  selectedFinding: string;
  setSelectedFinding: (value: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export const AddRadiologyForm: React.FC<AddRadiologyFormProps> = ({
  selectedStudy,
  setSelectedStudy,
  findings,
  setFindings,
  customStudy,
  setCustomStudy,
  selectedFinding,
  setSelectedFinding,
  onAdd,
  onCancel
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 p-4 border rounded-lg bg-white/10 backdrop-blur-md border-white/20"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Study Type</Label>
          <Select
            value={selectedStudy}
            onValueChange={(value) => {
              setSelectedStudy(value);
              if (value) {
                const study = COMMON_RADIOLOGY_STUDIES.find(s => s.id === value);
                if (study) {
                  setCustomStudy({ name: "", type: "" });
                  setSelectedFinding("");
                }
              }
            }}
          >
            <SelectTrigger className="rounded-xl shadow-xl py-3 px-4">
              <SelectValue placeholder="Select a study" />
            </SelectTrigger>
            <SelectContent className="rounded-xl p-1">
              <SelectItem value="" className="py-3 px-4 rounded-lg">
                Custom Study
              </SelectItem>
              {COMMON_RADIOLOGY_STUDIES.map((study) => (
                <SelectItem key={study.id} value={study.id} className="py-3 px-4 rounded-lg">
                  {study.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedStudy ? (
          <div className="space-y-2">
            <Label>Common Findings</Label>
            <Select
              value={selectedFinding}
              onValueChange={setSelectedFinding}
            >
              <SelectTrigger className="rounded-xl shadow-xl py-3 px-4">
                <SelectValue placeholder="Select common finding" />
              </SelectTrigger>
              <SelectContent className="rounded-xl p-1">
                {COMMON_RADIOLOGY_STUDIES.find(s => s.id === selectedStudy)?.commonFindings.map((finding) => (
                  <SelectItem key={finding} value={finding} className="py-3 px-4 rounded-lg">
                    {finding}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label>Study Name</Label>
              <Input
                value={customStudy.name}
                onChange={(e) => setCustomStudy({ ...customStudy, name: e.target.value })}
                placeholder="Enter study name"
              />
            </div>
            <div className="space-y-2">
              <Label>Study Type</Label>
              <Select
                value={customStudy.type}
                onValueChange={(value) => setCustomStudy({ ...customStudy, type: value })}
              >
                <SelectTrigger className="rounded-xl shadow-xl py-3 px-4">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl p-1">
                  {STUDY_TYPES.map((type) => (
                    <SelectItem key={type} value={type} className="py-3 px-4 rounded-lg">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>

      <div className="space-y-2">
        <Label>Findings</Label>
        <Textarea
          value={findings}
          onChange={(e) => setFindings(e.target.value)}
          placeholder="Enter detailed findings"
          className="min-h-[100px]"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="default"
          size="sm"
          className="bg-blue-500/80 hover:bg-blue-600 text-white"
          onClick={onAdd}
        >
          Add
        </Button>
      </div>
    </motion.div>
  );
}; 
