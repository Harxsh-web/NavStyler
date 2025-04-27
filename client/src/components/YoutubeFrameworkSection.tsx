import React from "react";
import { FaYoutube } from "react-icons/fa";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface YoutubeFrameworkSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  steps?: Step[];
  finalNote?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundColor?: string;
}

const YoutubeFrameworkSection: React.FC<{ youtubeFrameworkSection?: YoutubeFrameworkSectionProps }> = ({ 
  youtubeFrameworkSection 
}) => {
  if (!youtubeFrameworkSection) return null;

  const {
    title = "My Simple 3 Step YouTube Framework",
    subtitle = "How I Grew My Channel to 4,000,000 Subscribers",
    description = "This is the exact framework I used to grow my YouTube channel from 0 to over 4 million subscribers and generate 8 figures in revenue - all while maintaining my medical career.",
    steps = [
      { 
        number: 1, 
        title: "Find Your Validated Content Angle", 
        description: "Learn how to identify content topics people are actively searching for, and position yourself as the perfect creator to deliver what they need." 
      },
      { 
        number: 2, 
        title: "Create Value-First Content", 
        description: "Master my step-by-step process for creating content that genuinely helps viewers while building your authority and subscriber base." 
      },
      { 
        number: 3, 
        title: "Build Simple Systems for Growth", 
        description: "Implement my proven framework for consistently growing your channel and turning viewers into loyal fans and customers." 
      }
    ],
    finalNote = "This framework is what I teach my students who have gone on to build 6 and 7-figure YouTube channels and businesses - and now I'm sharing it with you.",
    buttonText = "Get The Full Framework",
    buttonUrl = "#buy",
    backgroundColor = "bg-gray-50"
  } = youtubeFrameworkSection;

  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <FaYoutube className="text-red-600 text-4xl mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
          <p className="text-xl font-medium text-gray-700 mb-4">{subtitle}</p>
          <p className="text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps && steps.map((step) => (
            <div key={step.number} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="rounded-full bg-red-100 text-red-600 text-2xl font-bold w-12 h-12 flex items-center justify-center mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-gray-700 italic mb-8">{finalNote}</p>
          
          <a
            href={buttonUrl}
            className="bg-red-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-red-700 transition duration-200 inline-block"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default YoutubeFrameworkSection;