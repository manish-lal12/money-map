import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Wallet, User, Bell } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <header className={cn("border-b border-border", className)}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Wallet className="h-6 w-6 text-finance-blue mr-2" />
          <h1 className="text-xl font-bold text-finance-blue">Money Map</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#"
            className="text-sm font-medium hover:text-finance-blue transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-finance-blue transition-colors"
          >
            Expenses
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-finance-blue transition-colors"
          >
            Tax Planner
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:text-finance-blue transition-colors"
          >
            Investments
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>

          <Link href="/auth/login">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
