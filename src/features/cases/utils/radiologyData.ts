import type { RadiologyStudy } from "@/types/case";

// Common radiology studies with typical findings
export const COMMON_RADIOLOGY_STUDIES = [
  { 
    id: "chest-xray",
    name: "Chest X-Ray",
    type: "X-Ray",
    commonFindings: [
      "Normal",
      "Pulmonary infiltrates",
      "Pleural effusion",
      "Cardiomegaly",
      "Pneumothorax",
      "Atelectasis"
    ]
  },
  { 
    id: "ct-chest",
    name: "CT Chest",
    type: "CT",
    commonFindings: [
      "Normal",
      "Ground glass opacities",
      "Consolidation",
      "Pulmonary nodules",
      "Mediastinal lymphadenopathy",
      "Pleural effusion"
    ]
  },
  { 
    id: "ct-abdomen",
    name: "CT Abdomen/Pelvis",
    type: "CT",
    commonFindings: [
      "Normal",
      "Appendicitis",
      "Diverticulitis",
      "Cholecystitis",
      "Bowel obstruction",
      "Free fluid"
    ]
  },
  { 
    id: "mri-brain",
    name: "MRI Brain",
    type: "MRI",
    commonFindings: [
      "Normal",
      "Acute infarct",
      "Mass lesion",
      "White matter changes",
      "Cerebral edema",
      "Hemorrhage"
    ]
  },
  { 
    id: "us-abdomen",
    name: "Ultrasound Abdomen",
    type: "Ultrasound",
    commonFindings: [
      "Normal",
      "Cholelithiasis",
      "Hepatomegaly",
      "Splenomegaly",
      "Ascites",
      "Renal calculi"
    ]
  },
  { 
    id: "echo",
    name: "Echocardiogram",
    type: "Ultrasound",
    commonFindings: [
      "Normal",
      "Reduced EF",
      "Valvular disease",
      "Pericardial effusion",
      "Wall motion abnormality",
      "Cardiac chamber enlargement"
    ]
  }
] as const;

export const STUDY_TYPES = [
  "X-Ray",
  "CT", 
  "MRI",
  "Ultrasound",
  "Nuclear Medicine",
  "Other"
] as const;

export const createRadiologyStudy = (
  selectedStudy: string,
  findings: string,
  customStudy: { name: string; type: string },
  selectedFinding: string
): RadiologyStudy => {
  if (selectedStudy) {
    const study = COMMON_RADIOLOGY_STUDIES.find(s => s.id === selectedStudy);
    return {
      id: selectedStudy,
      name: study?.name || "",
      type: study?.type || "",
      findings: findings || selectedFinding,
      date: new Date().toISOString(),
    };
  } else {
    return {
      id: `custom-${Date.now()}`,
      name: customStudy.name,
      type: customStudy.type,
      findings: findings,
      date: new Date().toISOString(),
    };
  }
};

export const getStudyById = (id: string) => {
  return COMMON_RADIOLOGY_STUDIES.find(s => s.id === id);
};

export const getStudyByName = (name: string) => {
  return COMMON_RADIOLOGY_STUDIES.find(s => s.name === name);
}; 