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

  // Map the response data
  const data = youtubeFrameworkSection || {};
  
  // Extract properties with fallbacks
  const title = data.title || "My Simple 3 Step YouTube Framework To Gain 10,000 Subscribers in 100 Days";
  const subtitle = data.subtitle || "";
  const description = data.description || "So many FAKE GURUS hide behind others success, BUT starting in 2024 I wanted to walk the walk, to prove my SIMPLE 3 step formula works So over the last 3 years, I've learned a lot about what it takes to build an audience from scratch, provide value consistently, and monetise in a non-spammy way. I've spent thousands of hours, and over $100,000 in courses and coaching programs to try and find the secret sauce that helps grow a channel and a business.";
  const steps = data.steps || [
    { 
      number: 1, 
      title: "Creating videos that people want to click on", 
      description: "" 
    },
    { 
      number: 2, 
      title: "Posting them on YouTube at least once a wee", 
      description: "" 
    },
    { 
      number: 3, 
      title: "Repeating this for at least 2 years", 
      description: "" 
    }
  ];
  const finalNote = data.finalNote || "That's all it takes. I personally guarantee that if you follow this 3-part formula, your life will change in ways you can't imagine. You'll learn incredibly useful skills, you'll make friends with amazing people from all over the world and you'll start to generate 'passive' income. You might even get messages from people about how your videos have changed their lives. 😊 It seems simple in theory, but the execution is slightly more difficult.";
  const buttonText = data.buttonText || "Enrol Now for $995";
  const buttonUrl = data.buttonUrl || "#buy";
  const backgroundColor = data.backgroundColor || "bg-gray-50";

  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <FaYoutube className="text-red-600 text-5xl mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-5xl mx-auto leading-tight">{title}</h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-800 text-lg mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
            
            <p className="text-gray-700 italic text-lg mb-2">
              And while I've learned a hell of a lot of things (more on that later), the biggest thing I've learned is this:
            </p>
            <p className="text-gray-700 font-medium text-lg mb-10">
              There's no secret to building a life-changing YouTube channel. It's just a matter of:
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps && steps.map((step) => (
            <div key={step.number} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
              <div className="rounded-full bg-red-100 text-red-600 text-2xl font-bold w-16 h-16 flex items-center justify-center mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
              {step.description && (
                <p className="text-gray-600 text-center" dangerouslySetInnerHTML={{ __html: step.description }} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg mb-12 leading-relaxed" dangerouslySetInnerHTML={{ __html: finalNote }} />
          
          <a
            href={buttonUrl}
            className="bg-red-600 text-white font-bold py-4 px-12 rounded-lg hover:bg-red-700 transition duration-200 inline-block text-lg"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default YoutubeFrameworkSection;