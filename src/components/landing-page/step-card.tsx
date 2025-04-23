interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
}

const StepCard = ({ stepNumber, title, description }: StepCardProps) => {
  return (
    <div className="relative bg-white rounded-xl p-6 card-shadow">
      <div className="purple-gradient text-white font-bold w-10 h-10 rounded-full flex items-center justify-center absolute -top-5 left-6">
        {stepNumber}
      </div>
      <div className="pt-4">
        <h3 className="text-xl font-semibold text-wealth-deep-blue mb-2">
          {title}
        </h3>
        <p className="text-wealth-gray">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
