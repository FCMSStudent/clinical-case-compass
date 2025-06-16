import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  createTypographyClass
} from '@/lib/typography';

export const ImplementationExamplesDemo: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className={createTypographyClass('h2', 'text-white')}>
        Implementation Examples
      </h2>
      
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Code Examples</CardTitle>
          <CardDescription className="text-white/70">
            How to use the new design system in your components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-black/20 p-4 rounded-lg">
            <code className="text-green-400 text-sm">
{`// Typography usage
import { typo, vitalSignsText } from '@/lib/typography';

<h1 className={typo.h1}>Patient Dashboard</h1>
<div className={vitalSignsText('normal')}>120/80 mmHg</div>

// Medical measurements
const bp = formatMedicalMeasurement('120/80', 'mmHg', 'normal');
<span className={bp.className}>{bp.value} {bp.unit}</span>`}
            </code>
          </div>
          
          <div className="bg-black/20 p-4 rounded-lg">
            <code className="text-blue-400 text-sm">
{`// Color system usage
// Status colors
<Badge className="status-success">Normal</Badge>
<Badge className="status-warning">Elevated</Badge>
<Badge className="status-error">Critical</Badge>

// Medical priorities
<span className={medicalPriorityText('high')}>High Priority</span>`}
            </code>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}; 