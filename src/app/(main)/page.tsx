import Image from "next/image";
import Footer from "@/components/landing-page/footer";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Shield, Bell, LineChart } from "lucide-react";
import FeatureCard from "@/components/landing-page/feature-card";
import TestimonialCard from "@/components/landing-page/testimonal-card";
import StepCard from "@/components/landing-page/step-card";
import ScrollToTopButton from "@/components/landing-page/scroll-to-top";

export default function LandingPage() {
  // Feature section data
  const features = [
    {
      icon: BarChart3,
      title: "Portfolio Management",
      description:
        "Easily track and manage your investments in one centralized dashboard.",
    },
    {
      icon: TrendingUp,
      title: "Investment Performance",
      description:
        "Monitor your investment performance with detailed analytics and insights.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Bank-level security to keep your financial information safe and protected.",
    },
    {
      icon: Bell,
      title: "Personalized Tax Optimization",
      description: "Generates tax-saving recommendations and forms.",
    },
    {
      icon: Bell,
      title: "Goal-Based Financial Planning",
      description: "Tracks short-term and long-term goals.",
    },
    {
      icon: Bell,
      title: "Investment Strategy Planner",
      description: "Suggests portfolios based on goals and market trends.",
    },
  ];

  // Steps data
  const steps = [
    {
      number: 1,
      title: "Create an Account",
      description:
        "Sign up in minutes with our simple onboarding process and verify your identity.",
    },
    {
      number: 2,
      title: "Set Your Goals",
      description:
        "Define your financial goals, whether it's retirement, a home, or education.",
    },
    {
      number: 3,
      title: "Track Investments",
      description:
        "Track all your investments performance and its current return.",
    },
    {
      number: 4,
      title: "Personalized AI recommendations",
      description:
        "Choose your investment strategy or let our robo-advisor create a personalized plan.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote:
        "MoneyMap has transformed how I manage my investments. The interface is intuitive and the insights are invaluable.",
      name: "Sarah Johnson",
      title: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote:
        "I've tried many investment platforms, but MoneyMap offers the perfect balance of simplicity and powerful features.",
      name: "Michael Chen",
      title: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote:
        "The automated investing features have helped me consistently grow my portfolio without the stress of daily management.",
      name: "Aisha Patel",
      title: "Financial Analyst",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <ScrollToTopButton />

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-wealth-deep-blue">
                Your Wealth,{" "}
                <span className="text-wealth-purple">Redefined</span>
              </h1>
              <p className="text-lg md:text-xl text-wealth-gray mb-8 max-w-xl">
                Experience the future of wealth management with powerful tools,
                intelligent insights, and personalized strategies tailored to
                your financial goals — all while staying on top of your taxes
                with smart planning and timely filing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-wealth-purple hover:bg-wealth-dark-purple text-lg px-8 py-6">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-wealth-purple text-wealth-purple hover:bg-wealth-purple/5 text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://randomuser.me/api/portraits/men/${
                        i + 20
                      }.jpg`}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <p className="ml-4 text-wealth-gray">
                  <span className="text-wealth-deep-blue font-bold">5+</span>{" "}
                  happy users
                </p>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Dashboard"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-wealth-purple/10 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-wealth-soft-blue rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-wealth-deep-blue mb-4">
              Powerful Features for Your Financial Growth
            </h2>
            <p className="text-wealth-gray max-w-2xl mx-auto">
              Our comprehensive set of tools help you manage, grow, and protect
              your wealth with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-wealth-deep-blue text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold mb-2 text-wealth-purple">
                $will be updated
              </p>
              <p className="text-gray-300">Assets Managed</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold mb-2 text-wealth-purple">100%</p>
              <p className="text-gray-300">Client Satisfaction</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold mb-2 text-wealth-purple">
                will update
              </p>
              <p className="text-gray-300">Active Users</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold mb-2 text-wealth-purple">0+</p>
              <p className="text-gray-300">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-wealth-soft-blue/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-wealth-deep-blue mb-4">
              How MoneyMap Works
            </h2>
            <p className="text-wealth-gray max-w-2xl mx-auto">
              Get started in minutes with our simple four-step process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <StepCard
                key={step.number}
                stepNumber={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* App Screenshot Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-wealth-deep-blue mb-6">
                Powerful Analytics at Your Fingertips
              </h2>
              <p className="text-wealth-gray mb-6">
                Our intuitive dashboard gives you a complete view of your
                financial landscape, with real-time data visualization and
                actionable insights.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <LineChart
                    className="text-wealth-purple mr-3 mt-1"
                    size={20}
                  />
                  <span className="text-wealth-gray">
                    Track performance across all your investments
                  </span>
                </li>
                <li className="flex items-start">
                  <LineChart
                    className="text-wealth-purple mr-3 mt-1"
                    size={20}
                  />
                  <span className="text-wealth-gray">
                    {/* Compare against market benchmarks */}
                    Visualize asset allocation and diversification
                  </span>
                </li>
                <li className="flex items-start">
                  <LineChart
                    className="text-wealth-purple mr-3 mt-1"
                    size={20}
                  />
                  <span className="text-wealth-gray">
                    Tax management and filing
                  </span>
                </li>
              </ul>
              <Button className="bg-wealth-purple hover:bg-wealth-dark-purple">
                Explore Dashboard
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-wealth-deep-blue p-4 rounded-xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                  alt="Dashboard Analytics"
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-wealth-soft-blue/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-wealth-deep-blue mb-4">
              What Our Clients Say
            </h2>
            <p className="text-wealth-gray max-w-2xl mx-auto">
              Thousands of individuals and businesses trust MoneyMap to manage
              their investments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden purple-gradient p-8 md:p-12">
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Financial Future?
              </h2>
              <p className="text-white/90 max-w-xl mx-auto mb-8">
                Join thousands of users who have already taken control of their
                finances with MoneyMap.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-white text-wealth-deep-blue hover:bg-white/90 text-lg">
                  Create Free Account
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 opacity-10">
              <svg width="400" height="400" viewBox="0 0 200 200">
                <path
                  fill="white"
                  d="M30.9,-42.3C35.9,-30.9,32.9,-15.5,35.6,2.7C38.3,20.9,46.7,41.7,41.7,52C36.7,62.3,18.4,62.1,1.9,59.8C-14.6,57.5,-29.3,53.2,-41.7,43C-54.2,32.9,-64.5,16.4,-63.5,1.1C-62.5,-14.3,-50.3,-28.6,-37.6,-40C-24.8,-51.5,-12.4,-60.2,1.5,-61.9C15.5,-63.6,25.9,-53.6,30.9,-42.3Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
