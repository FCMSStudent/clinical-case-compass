
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { getAllTags } from "@/data/mock-data";
import { Calendar } from "lucide-react";

const Study = () => {
  const allTags = getAllTags();

  return (
    <div>
      <PageHeader
        title="Study & Practice"
        description="Test your knowledge with case-based quizzes"
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2 card-hover">
          <CardHeader>
            <CardTitle>Generate Quiz</CardTitle>
            <CardDescription>
              Create a quiz based on your clinical cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Medical Specialty
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {allTags.map((tag) => (
                      <SelectItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Number of Questions
                </label>
                <Slider
                  defaultValue={[10]}
                  max={30}
                  step={5}
                  className="my-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>5</span>
                  <span>30</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Question Types
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="mcq" defaultChecked className="rounded" />
                    <label htmlFor="mcq" className="text-sm">Multiple choice</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="tf" defaultChecked className="rounded" />
                    <label htmlFor="tf" className="text-sm">True/False</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="shortAns" defaultChecked className="rounded" />
                    <label htmlFor="shortAns" className="text-sm">Short Answer</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="matching" defaultChecked className="rounded" />
                    <label htmlFor="matching" className="text-sm">Matching</label>
                  </div>
                </div>
              </div>

              <Button className="w-full">Generate Quiz</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quiz Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-xs text-muted-foreground">
                    Quizzes Taken
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">82%</div>
                  <div className="text-xs text-muted-foreground">
                    Average Score
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Performance by Specialty</div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cardiology</span>
                    <span className="text-muted-foreground">90%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Neurology</span>
                    <span className="text-muted-foreground">75%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Respiratory</span>
                    <span className="text-muted-foreground">82%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "82%" }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Quizzes</CardTitle>
          <CardDescription>
            Your quiz history and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Cardiology Quiz</h4>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>May 15, 2023 • 10 questions</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center">
                <div className="font-semibold mr-2">90%</div>
                <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "90%" }} />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Neurology Quiz</h4>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>April 22, 2023 • 15 questions</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center">
                <div className="font-semibold mr-2">75%</div>
                <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Mixed Specialties</h4>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>April 10, 2023 • 20 questions</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center">
                <div className="font-semibold mr-2">82%</div>
                <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "82%" }} />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Respiratory Quiz</h4>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>March 28, 2023 • 10 questions</span>
                </div>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center">
                <div className="font-semibold mr-2">80%</div>
                <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "80%" }} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Study;
