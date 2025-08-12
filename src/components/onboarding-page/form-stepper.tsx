import { CheckIcon } from "lucide-react";

interface FormStepperProps {
  currentStep: number;
  steps: string[];
}

export function FormStepper({ currentStep, steps }: FormStepperProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
              ${
                index <= currentStep
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "border-slate-300 text-slate-300"
              }`}
          >
            {index < currentStep ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-16 mt-4 hidden sm:block 
                ${index < currentStep ? "bg-emerald-500" : "bg-slate-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
