
// No longer importing from InteractiveBodyDiagram directly for these base types.

export type SeverityLevel = "critical" | "high" | "medium" | "low"; // Add "none" or other values if needed by your data.

// This BodyPartId is for the keys in the BODY_PARTS object and the 'id' field within each definition.
export type BodyPartId = string;

export interface BodyPartSymptom {
  name: string;
  severity: SeverityLevel;
  frequency: string; // e.g., "common", "rare", "very_common"
  category: string; // e.g., "pain", "sensory", "functional", "autonomic"
}

export interface BodyPartDefinition {
  id: BodyPartId;
  name: string;
  anatomicalRegion: string;
  relatedSystems: readonly string[];
  relatedSymptoms: Record<string, BodyPartSymptom[]>;
  commonConditions: string[];
  coordinates: { x: number; y: number }; // This seems to be for a different display, not used by SVG diagram directly
  priority: SeverityLevel; // Changed from urgencyLevel to priority for consistency
}

export const BODY_PARTS: Record<BodyPartId, BodyPartDefinition> = {
  head: {
    id: "head",
    name: "Head",
    anatomicalRegion: "Cranial",
    relatedSystems: ["Neurological", "Cardiovascular"] as const,
    relatedSymptoms: {
      "Neurological": [
        { name: "Headache", severity: "medium", frequency: "common", category: "pain" },
        { name: "Dizziness", severity: "low", frequency: "common", category: "sensory" }
      ]
    },
    commonConditions: ["Migraine", "Tension headache", "Concussion"],
    coordinates: { x: 140, y: 60 },
    priority: "medium"
  },
  neck: {
    id: "neck",
    name: "Neck",
    anatomicalRegion: "Cervical",
    relatedSystems: ["Musculoskeletal", "Neurological"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Neck pain", severity: "medium", frequency: "common", category: "pain" },
        { name: "Stiffness", severity: "low", frequency: "common", category: "functional" }
      ]
    },
    commonConditions: ["Muscle strain", "Cervical radiculopathy"],
    coordinates: { x: 140, y: 120 },
    priority: "low"
  },
  chest: {
    id: "chest",
    name: "Chest",
    anatomicalRegion: "Thoracic",
    relatedSystems: ["Cardiovascular", "Respiratory"] as const,
    relatedSymptoms: {
      "Cardiovascular": [
        { name: "Chest pain", severity: "high", frequency: "common", category: "pain" }
      ],
      "Respiratory": [
        { name: "Shortness of breath", severity: "high", frequency: "common", category: "functional" }
      ]
    },
    commonConditions: ["Angina", "Pneumonia", "Costochondritis"],
    coordinates: { x: 140, y: 180 },
    priority: "critical"
  },
  abdomen: {
    id: "abdomen",
    name: "Abdomen",
    anatomicalRegion: "Abdominal",
    relatedSystems: ["Gastrointestinal", "Urinary"] as const,
    relatedSymptoms: {
      "Gastrointestinal": [
        { name: "Abdominal pain", severity: "medium", frequency: "common", category: "pain" },
        { name: "Nausea", severity: "low", frequency: "common", category: "autonomic" }
      ]
    },
    commonConditions: ["Gastritis", "Appendicitis", "IBS"],
    coordinates: { x: 140, y: 280 },
    priority: "medium"
  },
  pelvis: {
    id: "pelvis",
    name: "Pelvis",
    anatomicalRegion: "Pelvic",
    relatedSystems: ["Urinary", "Gastrointestinal"] as const,
    relatedSymptoms: {
      "Urinary": [
        { name: "Pelvic pain", severity: "medium", frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["UTI", "Pelvic inflammatory disease"],
    coordinates: { x: 140, y: 340 },
    priority: "medium"
  },
  leftArm: {
    id: "leftArm",
    name: "Left Arm",
    anatomicalRegion: "Upper Extremity",
    relatedSystems: ["Musculoskeletal", "Neurological"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Arm pain", severity: "medium", frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Muscle strain", "Tendonitis"],
    coordinates: { x: 80, y: 200 },
    priority: "low"
  },
  rightArm: {
    id: "rightArm",
    name: "Right Arm",
    anatomicalRegion: "Upper Extremity",
    relatedSystems: ["Musculoskeletal", "Neurological"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Arm pain", severity: "medium", frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Muscle strain", "Tendonitis"],
    coordinates: { x: 200, y: 200 },
    priority: "low"
  },
  leftLeg: {
    id: "leftLeg",
    name: "Left Leg",
    anatomicalRegion: "Lower Extremity",
    relatedSystems: ["Musculoskeletal", "Cardiovascular"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Leg pain", severity: "medium", frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Muscle strain", "DVT"],
    coordinates: { x: 120, y: 420 },
    priority: "low"
  },
  rightLeg: {
    id: "rightLeg",
    name: "Right Leg",
    anatomicalRegion: "Lower Extremity",
    relatedSystems: ["Musculoskeletal", "Cardiovascular"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Leg pain", severity: "medium", frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Muscle strain", "DVT"],
    coordinates: { x: 160, y: 420 },
    priority: "low"
  },
  back: {
    id: "back",
    name: "Back",
    anatomicalRegion: "Dorsal",
    relatedSystems: ["Musculoskeletal", "Neurological"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Back pain", severity: "medium", frequency: "very_common", category: "pain" }
      ]
    },
    commonConditions: ["Lower back pain", "Herniated disc"],
    coordinates: { x: 140, y: 250 },
    priority: "medium"
  },
  spine: {
    id: "spine",
    name: "Spine",
    anatomicalRegion: "Spinal",
    relatedSystems: ["Neurological", "Musculoskeletal"] as const,
    relatedSymptoms: {
      "Neurological": [
        { name: "Nerve pain", severity: "high", frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Spinal stenosis", "Radiculopathy"],
    coordinates: { x: 140, y: 250 },
    priority: "high"
  },
  shoulders: {
    id: "shoulders",
    name: "Shoulders",
    anatomicalRegion: "Shoulder Girdle",
    relatedSystems: ["Musculoskeletal"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Shoulder pain", severity: "medium", frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Rotator cuff injury", "Frozen shoulder"],
    coordinates: { x: 140, y: 140 },
    priority: "low"
  }
};

