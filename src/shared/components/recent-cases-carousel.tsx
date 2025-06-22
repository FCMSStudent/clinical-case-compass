
import { Card, CardContent } from "@/shared/components/card";
import { Badge } from "@/shared/components/badge";
import { Button } from "@/shared/components/button";
import { ChevronLeft, ChevronRight, Calendar, User, FileText, Clock } from "lucide-react";
import { MedicalCase } from "@/shared/types/case";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface RecentCasesCarouselProps {
  cases: MedicalCase[];
  isLoading: boolean;
}

export function RecentCasesCarousel({ cases, isLoading }: RecentCasesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  
  const visibleCases = 3;
  const maxIndex = Math.max(0, cases.length - visibleCases);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleCaseClick = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-6 w-32 bg-white/20 rounded animate-pulse" />
            <div className="h-4 w-48 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="min-w-[280px] bg-white/10 backdrop-blur-sm border-white/20 animate-pulse">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="h-5 w-5 bg-white/20 rounded-full" />
                  <div className="h-4 w-16 bg-white/20 rounded-full" />
                </div>
                <div className="h-5 w-full bg-white/20 rounded" />
                <div className="h-4 w-24 bg-white/20 rounded" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-white/20 rounded-full" />
                  <div className="h-6 w-20 bg-white/20 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      // Applying glass-panel style, using p-6 as it's a standalone panel
      <div className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-6 text-center">
        <FileText className="h-12 w-12 text-white/60 mx-auto mb-4" /> {/* Increased icon opacity slightly */}
        <h3 className="text-xl font-semibold text-white mb-2">No Cases Yet</h3> {/* Typography: text-xl as per general panel titles */}
        <p className="text-base text-white/80 mb-4">Start by creating your first medical case</p> {/* Typography: text-base, improved contrast */}
        <Button
          onClick={() => navigate('/cases/new')}
          // Button styling will be reviewed in a later step, using existing for now
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-[16px]" // Added rounded-[16px]
        >
          Create First Case
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-white/80" />
            Recent Cases
          </h3>
          <p className="text-white/70">Your latest documented cases</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-8 w-8 p-0 text-white hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="h-8 w-8 p-0 text-white hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <motion.div 
          className="flex gap-4"
          animate={{ x: -currentIndex * 296 }} // 280px width + 16px gap
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <AnimatePresence>
            {cases.map((medicalCase, index) => (
              // Applying glass-panel p-4 to the motion.div, replacing Card
              <motion.div
                key={medicalCase.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="min-w-[280px] bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-4 hover:shadow-lg transition cursor-pointer group"
                onClick={() => handleCaseClick(medicalCase.id)}
              >
                {/* Replicating spec structure: icon + text, then status dot */}
                <div className="flex items-center justify-between h-full"> {/* Added h-full for consistent height if needed */}
                  <span className="flex items-center flex-grow min-w-0 mr-3"> {/* Left part */}
                    {/* Icon section - glass-inner */}
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full mr-3 flex-shrink-0">
                      {/* Using FileText from original carousel item, styled as per spec */}
                      <FileText className="h-5 w-5 text-white/70" />
                    </div>

                    {/* Text content div */}
                    <div className="flex-grow min-w-0">
                      <div className="font-semibold text-white text-base truncate" title={medicalCase.title}>
                        {medicalCase.title || "Untitled Case"}
                      </div>
                      <div className="text-sm text-white/70 truncate">
                        {medicalCase.patient ? `${medicalCase.patient.name} • ${formatDistanceToNow(new Date(medicalCase.updatedAt), { addSuffix: true })}` : formatDistanceToNow(new Date(medicalCase.updatedAt), { addSuffix: true })}
                      </div>
                    </div>
                  </span>

                  {/* Right Section: Status Indicator (e.g. based on tags or a status field) */}
                  {/* Using a simple green dot as placeholder, similar to CaseListItem */}
                  <span className="inline-block w-3 h-3 rounded-full bg-green-400/80 flex-shrink-0"></span>
                </div>
                {/* Original more detailed content is simplified to match spec.
                    If details like chief complaint, specific tags are needed, this structure would expand.
                */}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
