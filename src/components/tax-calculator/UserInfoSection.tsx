
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Users } from 'lucide-react';
import { useTaxData } from './TaxDataContext';

const UserInfoSection: React.FC = () => {
  const {
    assessmentYear,
    setAssessmentYear,
    ageGroup,
    setAgeGroup,
    residentialStatus,
    setResidentialStatus
  } = useTaxData();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-finance-blue" />
          Taxpayer Information
        </CardTitle>
        <CardDescription>Age and residency details impact your tax calculation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Assessment Year</h3>
          <RadioGroup 
            value={assessmentYear}
            onValueChange={(value) => setAssessmentYear(value as '2024-25' | '2025-26' | '2026-27')}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2024-25" id="ay-2024-25" />
              <Label htmlFor="ay-2024-25">AY 2024-25</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2025-26" id="ay-2025-26" />
              <Label htmlFor="ay-2025-26">AY 2025-26</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2026-27" id="ay-2026-27" />
              <Label htmlFor="ay-2026-27">AY 2026-27</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <h3 className="text-sm font-medium">Age Group</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground inline ml-1 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-80">Age impacts tax slabs in the old regime. Senior citizens (60+ years) get higher basic exemption limits.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <RadioGroup 
            value={ageGroup}
            onValueChange={(value) => setAgeGroup(value as 'below60' | '60to80' | 'above80')}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="below60" id="age-below60" />
              <Label htmlFor="age-below60">Below 60 years</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="60to80" id="age-60to80" />
              <Label htmlFor="age-60to80">60 to 80 years</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="above80" id="age-above80" />
              <Label htmlFor="age-above80">Above 80 years</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <h3 className="text-sm font-medium">Residential Status</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground inline ml-1 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-80">Your residential status determines what income is taxable in India and what tax benefits are available to you.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <RadioGroup 
            value={residentialStatus}
            onValueChange={(value) => setResidentialStatus(value as 'resident' | 'non-resident')}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="resident" id="status-resident" />
              <Label htmlFor="status-resident">Resident</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non-resident" id="status-non-resident" />
              <Label htmlFor="status-non-resident">Non-Resident</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoSection;
