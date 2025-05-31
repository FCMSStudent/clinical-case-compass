
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Clock, Plus } from "lucide-react";

const Schedule = () => {
  return (
    <div className="container">
      <PageHeader
        title="Schedule"
        description="Manage your rotations and study sessions"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </PageHeader>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>View and manage your schedule</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Today</Button>
                  <div className="flex">
                    <Button variant="ghost" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Select defaultValue="month">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Cardiology Rotation</h4>
                    <span className="text-xs bg-medical-100 text-medical-700 px-2 py-0.5 rounded-full">
                      Rotation
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>May 20 - June 17, 2023</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                </div>
                
                <div className="p-3 bg-accent/50 rounded-lg border border-accent">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">SMLE Study Session</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      Study
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Today</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>7:00 PM - 9:00 PM</span>
                  </div>
                </div>
                
                <div className="p-3 bg-secondary rounded-lg border">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Case Presentation</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Presentation
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>May 22, 2023</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>2:00 PM - 3:00 PM</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Add Quick Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Event title" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rotation">Rotation</SelectItem>
                      <SelectItem value="study">Study Session</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date & Time</label>
                  <div className="flex gap-2">
                    <Input type="date" className="flex-1" />
                    <Input type="time" className="flex-1" />
                  </div>
                </div>
                
                <Button className="w-full">Add Event</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

import { ChevronLeft, ChevronRight } from "lucide-react";

export default Schedule;
