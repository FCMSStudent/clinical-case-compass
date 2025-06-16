import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  responsiveType,
  createTypographyClass
} from '@/lib/typography';

export const ResponsiveTypographyDemo: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className={createTypographyClass('h2', 'text-white')}>
        Responsive Typography
      </h2>
      
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Responsive Design</CardTitle>
          <CardDescription className="text-white/70">
            Typography that adapts to different screen sizes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={responsiveType.hero + ' text-white'}>
            Hero Text - Scales from 3xl to 6xl
          </div>
          <div className={responsiveType.display + ' text-white'}>
            Display Text - Scales from 2xl to 4xl
          </div>
          <div className={responsiveType.h1 + ' text-white'}>
            Heading 1 - Scales from 2xl to 4xl
          </div>
          <div className={responsiveType.body + ' text-white/80'}>
            Body text that scales from small to base size for optimal readability 
            across all device sizes, ensuring consistent user experience.
          </div>
        </CardContent>
      </Card>
    </section>
  );
}; 