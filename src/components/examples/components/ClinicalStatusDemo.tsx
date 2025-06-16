import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  typo, 
  clinicalStatusText, 
  treatmentStatusText,
  formatMedicalMeasurement,
  createTypographyClass
} from '@/lib/typography';
import { 
  User,
  Stethoscope,
  AlertTriangle
} from 'lucide-react';

export const ClinicalStatusDemo: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className={createTypographyClass('h2', 'text-white')}>
        Clinical Status Examples
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Status Card */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5" />
              Patient Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Overall Status</span>
              <span className={clinicalStatusText('stable')}>Stable</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Monitoring Level</span>
              <span className={clinicalStatusText('monitoring')}>Active Monitoring</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Condition Type</span>
              <span className={clinicalStatusText('chronic')}>Chronic</span>
            </div>
            
            <div className="pt-4 border-t border-white/20">
              <h4 className={typo.h6}>Recent Vitals</h4>
              <div className="mt-2 space-y-2">
                {(() => {
                  const bp = formatMedicalMeasurement('120/80', 'mmHg', 'normal');
                  const hr = formatMedicalMeasurement('72', 'BPM', 'normal');
                  const temp = formatMedicalMeasurement('98.6', '°F', 'normal');
                  
                  return (
                    <>
                      <div className="flex justify-between">
                        <span className="text-white/70">Blood Pressure</span>
                        <span className={bp.className}>{bp.value} {bp.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Heart Rate</span>
                        <span className={hr.className}>{hr.value} {hr.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Temperature</span>
                        <span className={temp.className}>{temp.value} {temp.unit}</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Treatment Status Card */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Treatment Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Medication Therapy</span>
                <span className={treatmentStatusText('ongoing')}>Ongoing</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Physical Therapy</span>
                <span className={treatmentStatusText('pending')}>Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">Lab Results</span>
                <span className={treatmentStatusText('complete')}>Complete</span>
              </div>
            </div>
            
            <Alert className="bg-warning/20 border-warning/30">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertTitle className="text-warning">Follow-up Required</AlertTitle>
              <AlertDescription className="text-warning/80">
                Patient scheduled for follow-up appointment in 2 weeks
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}; 