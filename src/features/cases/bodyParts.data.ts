
import { BodyPartSelection, BodyPartId, SeverityLevel } from './InteractiveBodyDiagram';

export const BODY_PARTS: Record<BodyPartId, BodyPartSelection> = {
  head: {
    id: "head",
    name: "Head",
    anatomicalRegion: "Cranial",
    relatedSystems: ["Neurological", "Cardiovascular"] as const,
    relatedSymptoms: {
      "Neurological": [
        { name: "Headache", severity: "medium" as SeverityLevel, frequency: "common", category: "pain" },
        { name: "Dizziness", severity: "low" as SeverityLevel, frequency: "common", category: "sensory" }
      ]
    },
    commonConditions: ["Migraine", "Tension headache", "Concussion"],
    coordinates: { x: 140, y: 60 },
    urgencyLevel: "medium" as SeverityLevel
  },
  neck: {
    id: "neck",
    name: "Neck",
    anatomicalRegion: "Cervical",
    relatedSystems: ["Musculoskeletal", "Neurological"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Neck pain", severity: "medium" as SeverityLevel, frequency: "common", category: "pain" },
        { name: "Stiffness", severity: "low" as SeverityLevel, frequency: "common", category: "functional" }
      ]
    },
    commonConditions: ["Muscle strain", "Cervical radiculopathy"],
    coordinates: { x: 140, y: 120 },
    urgencyLevel: "low" as SeverityLevel
  },
  chest: {
    id: "chest",
    name: "Chest",
    anatomicalRegion: "Thoracic",
    relatedSystems: ["Cardiovascular", "Respiratory"] as const,
    relatedSymptoms: {
      "Cardiovascular": [
        { name: "Chest pain", severity: "high" as SeverityLevel, frequency: "common", category: "pain" }
      ],
      "Respiratory": [
        { name: "Shortness of breath", severity: "high" as SeverityLevel, frequency: "common", category: "functional" }
      ]
    },
    commonConditions: ["Angina", "Pneumonia", "Costochondritis"],
    coordinates: { x: 140, y: 180 },
    urgencyLevel: "high" as SeverityLevel
  },
  abdomen: {
    id: "abdomen",
    name: "Abdomen",
    anatomicalRegion: "Abdominal",
    relatedSystems: ["Gastrointestinal", "Urinary"] as const,
    relatedSymptoms: {
      "Gastrointestinal": [
        { name: "Abdominal pain", severity: "medium" as SeverityLevel, frequency: "common", category: "pain" },
        { name: "Nausea", severity: "low" as SeverityLevel, frequency: "common", category: "autonomic" }
      ]
    },
    commonConditions: ["Gastritis", "Appendicitis", "IBS"],
    coordinates: { x: 140, y: 280 },
    urgencyLevel: "medium" as SeverityLevel
  },
  pelvis: {
    id: "pelvis",
    name: "Pelvis",
    anatomicalRegion: "Pelvic",
    relatedSystems: ["Urinary", "Gastrointestinal"] as const,
    relatedSymptoms: {
      "Urinary": [
        { name: "Pelvic pain", severity: "medium" as SeverityLevel, frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["UTI", "Pelvic inflammatory disease"],
    coordinates: { x: 140, y: 340 },
    urgencyLevel: "medium" as SeverityLevel
  },
  leftArm: {
    id: "leftArm",
    name: "Left Arm",
    anatomicalRegion: "Upper Extremity",
    relatedSystems: ["Musculoskeletal", "Neurological"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Arm pain", severity: "medium" as SeverityLevel, frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Muscle strain", "Tendonitis"],
    coordinates: { x: 80, y: 200 },
    urgencyLevel: "low" as SeverityLevel
  },
  rightArm: {
    id: "rightArm",
    name: "Right Arm",
    anatomicalRegion: "Upper Extremity",
    relatedSystems: ["Musculoskeletal", "Neurological"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Arm pain", severity: "medium" as SeverityLevel, frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Muscle strain", "Tendonitis"],
    coordinates: { x: 200, y: 200 },
    urgencyLevel: "low" as SeverityLevel
  },
  leftLeg: {
    id: "leftLeg",
    name: "Left Leg",
    anatomicalRegion: "Lower Extremity",
    relatedSystems: ["Musculoskeletal", "Cardiovascular"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Leg pain", severity: "medium" as SeverityLevel, frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Muscle strain", "DVT"],
    coordinates: { x: 120, y: 420 },
    urgencyLevel: "low" as SeverityLevel
  },
  rightLeg: {
    id: "rightLeg",
    name: "Right Leg",
    anatomicalRegion: "Lower Extremity",
    relatedSystems: ["Musculoskeletal", "Cardiovascular"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Leg pain", severity: "medium" as SeverityLevel, frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Muscle strain", "DVT"],
    coordinates: { x: 160, y: 420 },
    urgencyLevel: "low" as SeverityLevel
  },
  back: {
    id: "back",
    name: "Back",
    anatomicalRegion: "Dorsal",
    relatedSystems: ["Musculoskeletal", "Neurological"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Back pain", severity: "medium" as SeverityLevel, frequency: "very_common", category: "pain" }
      ]
    },
    commonConditions: ["Lower back pain", "Herniated disc"],
    coordinates: { x: 140, y: 250 },
    urgencyLevel: "medium" as SeverityLevel
  },
  spine: {
    id: "spine",
    name: "Spine",
    anatomicalRegion: "Spinal",
    relatedSystems: ["Neurological", "Musculoskeletal"] as const,
    relatedSymptoms: {
      "Neurological": [
        { name: "Nerve pain", severity: "high" as SeverityLevel, frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Spinal stenosis", "Radiculopathy"],
    coordinates: { x: 140, y: 250 },
    urgencyLevel: "high" as SeverityLevel
  },
  shoulders: {
    id: "shoulders",
    name: "Shoulders",
    anatomicalRegion: "Shoulder Girdle",
    relatedSystems: ["Musculoskeletal"] as const,
    relatedSymptoms: {
      "Musculoskeletal": [
        { name: "Shoulder pain", severity: "medium" as SeverityLevel, frequency: "common", category: "pain" }
      ]
    },
    commonConditions: ["Rotator cuff injury", "Frozen shoulder"],
    coordinates: { x: 140, y: 140 },
    urgencyLevel: "low" as SeverityLevel
  }
};
