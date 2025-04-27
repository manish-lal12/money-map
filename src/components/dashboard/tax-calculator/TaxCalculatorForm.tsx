import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TaxRegimeSelector from "./TaxRegimeSelector";
import IncomeSection from "./form-sections/IncomeSection";
import DeductionsSection from "./form-sections/DeductionsSection";
import { useTaxData } from "./TaxDataContext";

interface TaxCalculatorFormProps {
  onCalculate: () => void;
}

const TaxCalculatorForm: React.FC<TaxCalculatorFormProps> = ({
  onCalculate,
}) => {
  const {
    calculatorMode,
    setCalculatorMode,
    assessmentYear,
    setAssessmentYear,
  } = useTaxData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center ml-auto">
          <div className="flex items-center space-x-2">
            <Label htmlFor="calculator-mode">Advanced Mode</Label>
            <Switch
              id="calculator-mode"
              checked={calculatorMode === "advanced"}
              onCheckedChange={(checked) =>
                setCalculatorMode(checked ? "advanced" : "simple")
              }
            />
          </div>

          <RadioGroup
            defaultValue="2025-26"
            value={assessmentYear}
            onValueChange={(value) =>
              setAssessmentYear(value as "2024-25" | "2025-26" | "2026-27")
            }
            className="flex space-x-2"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="2024-25" id="ay-2024-25" />
              <Label htmlFor="ay-2024-25">AY 2024-25</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="2025-26" id="ay-2025-26" />
              <Label htmlFor="ay-2025-26">AY 2025-26</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="2026-27" id="ay-2026-27" />
              <Label htmlFor="ay-2026-27">AY 2026-27</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <TaxRegimeSelector />

      <div className="grid gap-6 md:grid-cols-2">
        <IncomeSection />
        <DeductionsSection onCalculate={onCalculate} />
      </div>
    </div>
  );
};

export default TaxCalculatorForm;
