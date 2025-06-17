import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp } from 'lucide-react';
import { StaggeredItem } from '@/components/ui/animation';
import { getBentoStyles, getComponentStyles } from '@/lib/design-system';
import { card } from "@/lib/components";

export function BentoGridDemo() {
  return (
    <StaggeredItem>
      <Card className={card.variant.featured}>
        <CardHeader>
          <CardTitle className="text-white">Enhanced Bento Grid</CardTitle>
          <CardDescription className="text-white/70">
            Responsive grid system with predefined layouts for medical dashboards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={getBentoStyles('container', 'default')}>
            <div className={`${getBentoStyles('card', 'small')} ${card.variant.default} p-4 rounded-lg`}>
              <Users className="h-6 w-6 text-blue-400 mb-2" />
              <div className="text-white font-medium">Patients</div>
              <div className="text-2xl font-bold text-white">1,234</div>
            </div>
            
            <div className={`${getBentoStyles('card', 'medium')} ${card.variant.default} p-4 rounded-lg`}>
              <TrendingUp className="h-6 w-6 text-green-400 mb-2" />
              <div className="text-white font-medium mb-4">Patient Statistics</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Recovery Rate</span>
                  <span className="text-green-400">94.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Average Stay</span>
                  <span className="text-white">3.2 days</span>
                </div>
              </div>
            </div>
            
            <div className={`${getBentoStyles('card', 'large')} ${card.variant.elevated} p-4 rounded-lg`}>
              <div className="text-white font-medium mb-4">Medical Dashboard</div>
              <div className="space-y-3">
                <Input 
                  placeholder="Search patients..." 
                  className={getComponentStyles('input', 'default', 'md')}
                />
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                    Stable: {12}
                  </Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                    Monitor: {5}
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-300 border-red-400/30">
                    Critical: {2}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </StaggeredItem>
  );
} 