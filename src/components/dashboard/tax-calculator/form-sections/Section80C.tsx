import React from "react";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BadgeIndianRupee, ChevronDown } from "lucide-react";
import { formatCurrency } from "@/utils/financialUtils";
import { useTaxData } from "../TaxDataContext";

const Section80C: React.FC = () => {
  const {
    epfContribution,
    setEpfContribution,
    ppfInvestment,
    setPpfInvestment,
    elssInvestment,
    setElssInvestment,
    lifeInsurance,
    setLifeInsurance,
    tuitionFees,
    setTuitionFees,
    otherEightyC,
    setOtherEightyC,
    section80C,
  } = useTaxData();

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-left">
        <span className="flex items-center">
          <BadgeIndianRupee className="h-4 w-4 mr-2" />
          Section 80C (Max ₹1,50,000)
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-2 pl-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            EPF Contribution
          </label>
          <Input
            type="number"
            value={epfContribution}
            onChange={(e) => setEpfContribution(Number(e.target.value) || 0)}
            placeholder="Employee's EPF contribution"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            PPF Investment
          </label>
          <Input
            type="number"
            value={ppfInvestment}
            onChange={(e) => setPpfInvestment(Number(e.target.value) || 0)}
            placeholder="Public Provident Fund investment"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            ELSS Investment
          </label>
          <Input
            type="number"
            value={elssInvestment}
            onChange={(e) => setElssInvestment(Number(e.target.value) || 0)}
            placeholder="Equity Linked Saving Scheme investment"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Life Insurance Premium
          </label>
          <Input
            type="number"
            value={lifeInsurance}
            onChange={(e) => setLifeInsurance(Number(e.target.value) || 0)}
            placeholder="Annual life insurance premium"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Children&apos;s Tuition Fees
          </label>
          <Input
            type="number"
            value={tuitionFees}
            onChange={(e) => setTuitionFees(Number(e.target.value) || 0)}
            placeholder="School tuition fees (max 2 children)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Other 80C Investments
          </label>
          <Input
            type="number"
            value={otherEightyC}
            onChange={(e) => setOtherEightyC(Number(e.target.value) || 0)}
            placeholder="NSC, SCSS, Tax-saving FD, etc."
          />
        </div>

        <div className="pt-2 flex justify-between items-center">
          <span className="text-sm">Total 80C Claimed:</span>
          <span
            className={`font-medium ${
              section80C >= 150000 ? "text-finance-green" : ""
            }`}
          >
            {formatCurrency(section80C)}
            {section80C >= 150000 && " (Limit reached)"}
          </span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Section80C;
