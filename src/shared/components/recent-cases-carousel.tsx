
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
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Cases Yet</h3>
          <p className="text-white/70 mb-4">Start by creating your first medical case</p>
          <Button 
            onClick={() => navigate('/cases/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create First Case
          </Button>
        </CardContent>
      </Card>
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
              <motion.div
                key={medicalCase.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="min-w-[280px]"
              >
                <Card 
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleCaseClick(medicalCase.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                          <FileText className="h-4 w-4 text-blue-400" />
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {medicalCase.patient.age}y {medicalCase.patient.gender}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white line-clamp-1 group-hover:text-blue-100 transition-colors">
                          {medicalCase.title}
                        </h4>
                        <div className="flex items-center gap-1 text-sm text-white/70 mt-1">
                          <User className="h-3 w-3" />
                          {medicalCase.patient.name}
                        </div>
                      </div>
                      
                      <p className="text-sm text-white/70 line-clamp-2">
                        {medicalCase.chiefComplaint}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-white/60">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(medicalCase.updatedAt), { addSuffix: true })}
                        </div>
                        {medicalCase.tags.length > 0 && (
                          <Badge 
                            variant="secondary" 
                            className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs"
                          >
                            {medicalCase.tags[0].name}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
