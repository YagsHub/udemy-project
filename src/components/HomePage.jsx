import {
  CheckCircle,
  Calendar,
  Clock,
  Star,
  Search,
  ArrowRight,
  Menu,
} from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#7793aa]">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-2xl">YagsHub</div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Desktop Navigation */}
          <div
            className={`md:flex items-center gap-6 ${
              isMenuOpen
                ? "absolute top-16 left-0 right-0 bg-[#7793aa] p-4 flex flex-col"
                : "hidden md:flex"
            }`}
          >
            <div className="relative hidden md:block">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search features"
                className="pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <a href="/login" className="text-white hover:text-gray-200">
              Log In
            </a>
            <a
              href="/register"
              className="bg-white text-[#7793aa] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Free
            </a>
            <a href="/portfolio" className="text-white hover:text-gray-200">
              Developer
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Make it <span className="text-gray-300">organized.</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Your all-in-one task prioritization tool designed for students.
              Stay on top of assignments, deadlines, and study schedules.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-[#7793aa] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                START A FREE TRIAL
                <ArrowRight size={20} />
              </button>
              <p className="text-gray-300 text-sm mt-2 sm:mt-4">
                No credit card required.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <div className="bg-white rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="text-blue-600" />
                  <div>
                    <h3 className="font-medium">Math Assignment</h3>
                    <p className="text-sm text-gray-600">
                      High Priority • Due Tomorrow
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                  <Calendar className="text-purple-600" />
                  <div>
                    <h3 className="font-medium">Study Group</h3>
                    <p className="text-sm text-gray-600">
                      Medium Priority • Thursday
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                  <Clock className="text-green-600" />
                  <div>
                    <h3 className="font-medium">Essay Review</h3>
                    <p className="text-sm text-gray-600">
                      Low Priority • Next Week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/5 backdrop-blur-sm py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Smart Features for Smart Students
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle size={24} />,
                title: "Priority Management",
                description:
                  "Automatically organize tasks based on deadlines and importance",
              },
              {
                icon: <Calendar size={24} />,
                title: "Schedule Integration",
                description: "Sync with your class schedule and calendar",
              },
              {
                icon: <Star size={24} />,
                title: "Study Time Tracking",
                description: "Monitor and optimize your study sessions",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="text-white mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
