import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 card-shadow flex flex-col items-center md:items-start text-center md:text-left hover:translate-y-[-5px] transition-transform duration-300">
      <div className="p-3 rounded-full bg-wealth-soft-blue mb-4 text-wealth-purple">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold text-wealth-deep-blue mb-2">
        {title}
      </h3>
      <p className="text-wealth-gray">{description}</p>
    </div>
  );
};

export default FeatureCard;
