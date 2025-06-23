
// Type Definitions - using named exports instead of star exports
export type { User, AuthState, AuthAction, LoginCredentials, SignupCredentials } from './auth';
export type { 
  Patient, 
  CaseTag, 
  DiagnosisStatus, 
  Diagnosis, 
  Resource, 
  LabTest, 
  RadiologyStudy, 
  MedicalCase, 
  ApiError, 
  FormErrors, 
  LoadingState, 
  SaveStatus, 
  BodyPart 
} from './case';
export { SPECIALTIES } from './case';
