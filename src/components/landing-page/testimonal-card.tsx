interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  image: string;
}

const TestimonialCard = ({
  quote,
  name,
  title,
  image,
}: TestimonialCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 card-shadow">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-1 text-wealth-purple">
          {/* 5 stars */}
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>

        <p className="text-wealth-deep-blue italic">"{quote}"</p>

        <div className="flex items-center space-x-3">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-wealth-deep-blue">{name}</h4>
            <p className="text-sm text-wealth-gray">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
