import React, { useState, useEffect } from "react";
import TaxCalculatorForm from "./TaxCalculatorForm";
import TaxCalculatorResults from "./TaxCalculatorResults";
import UserInfoSection from "./UserInfoSection";
import { TaxDataProvider } from "./TaxDataContext";

const TaxCalculator: React.FC = () => {
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle URL params for sharing
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (
      urlParams.has("salary") ||
      urlParams.has("regime") ||
      urlParams.has("ay")
    ) {
      setShowResults(true);
    }
  }, []);

  const handleCalculate = () => {
    setShowResults(true);
    setTimeout(() => {
      const resultsElement = document.getElementById("tax-results");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="space-y-8">
      <TaxDataProvider>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              Income Tax Calculator (AY 2026-27)
            </h2>
            <p className="text-muted-foreground">
              Plan your taxes and maximize savings
            </p>
          </div>
        </div>

        <UserInfoSection />

        <TaxCalculatorForm onCalculate={handleCalculate} />

        {showResults && (
          <div id="tax-results" className="animate-fade-in">
            <TaxCalculatorResults />
          </div>
        )}
      </TaxDataProvider>
    </div>
  );
};

export default TaxCalculator;
