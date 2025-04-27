
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from 'lucide-react';
import { useTaxData } from './TaxDataContext';

const TaxRegimeSelector: React.FC = () => {
  const { selectedRegime, setSelectedRegime } = useTaxData();
  
  return (
    <div className="bg-muted/30 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Choose Your Tax Regime</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          className={`p-4 rounded-lg cursor-pointer transition-all ${
            selectedRegime === 'new' 
              ? 'bg-finance-green/10 border-2 border-finance-green' 
              : 'bg-background border border-border hover:bg-muted/50'
          }`}
          onClick={() => setSelectedRegime('new')}
        >
          <div className="flex items-center gap-2 mb-2">
            {selectedRegime === 'new' && <CheckCircle2 className="h-5 w-5 text-finance-green" />}
            <h4 className="font-medium">New Tax Regime</h4>
            <Badge className="ml-auto bg-finance-green/20 text-finance-green hover:bg-finance-green/30">Default</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Higher standard deduction (₹75,000) but no tax-saving deductions under Chapter VI-A</p>
        </div>
        
        <div 
          className={`p-4 rounded-lg cursor-pointer transition-all ${
            selectedRegime === 'old' 
              ? 'bg-finance-blue/10 border-2 border-finance-blue' 
              : 'bg-background border border-border hover:bg-muted/50'
          }`}
          onClick={() => setSelectedRegime('old')}
        >
          <div className="flex items-center gap-2 mb-2">
            {selectedRegime === 'old' && <CheckCircle2 className="h-5 w-5 text-finance-blue" />}
            <h4 className="font-medium">Old Tax Regime</h4>
          </div>
          <p className="text-sm text-muted-foreground">Lower standard deduction (₹50,000) but allows various tax-saving deductions</p>
        </div>
      </div>
    </div>
  );
};

export default TaxRegimeSelector;
