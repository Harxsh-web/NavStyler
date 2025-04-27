import React from "react";
import { Button } from "@/components/ui/button";
import frameworkImage from "@assets/image_1745779744330.png";

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

const YoutubeFrameworkSection: React.FC<YoutubeFrameworkSectionProps> = ({
  title = "My Simple 3 Step YouTube Framework To Gain 10,000 Subscribers in 100 Days",
  subtitle = "The Simple \"Secret\" Formula to 100,000+ Subscribers",
  description = "So over the last 7 years, I've learned a lot about what it takes to build an audience from scratch, provide value consistently, and monetise in a non-spammy way.",
  steps = [
    {
      number: 1,
      title: "Creating",
      description: "videos that people find valuable"
    },
    {
      number: 2,
      title: "Posting",
      description: "them on YouTube at least once a week"
    },
    {
      number: 3,
      title: "Repeating",
      description: "this for at least 2 years"
    }
  ],
  finalNote = "I personally guarantee that if you follow this 3-part formula, your life will change in ways you can't imagine. You'll learn incredibly useful skills, you'll make friends with amazing people from all over the world and you'll start to generate 'passive' income. You might even get messages from people about how your videos have changed their lives 😳 It seems simple in theory, but the execution is slightly more difficult.",
  buttonText = "Enrol Now for $995",
  buttonUrl = "#enroll-now",
  backgroundColor = "#faf7f2",
}) => {
  return (
    <section 
      className="w-full py-16 md:py-24" 
      style={{ backgroundColor: backgroundColor || "#faf7f2" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
            <p className="text-gray-600 italic mb-6">So many FAKE GURUS hide behind others success, BUT starting in 2024 I wanted to walk the walk, to prove my SIMPLE 3 step formula works</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <img 
              src={frameworkImage} 
              alt="YouTube Framework" 
              className="w-full h-auto"
            />
            
            <div className="p-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900">{subtitle}</h3>
              
              <div className="mb-8">
                <p className="text-gray-700 text-lg mb-6">{description}</p>
                
                <p className="text-gray-700 text-lg mb-4">
                  I've spent <span className="font-semibold">thousands of hours</span>, and over <span className="font-semibold">$100,000 in courses and coaching programs</span> to try and find the secret sauce that helps grow a channel and a business.
                </p>
                
                <p className="text-gray-700 text-lg mb-6">
                  And while I've learned a hell of a lot of things (more on that later), the biggest thing I've learned is this:
                </p>
                
                <p className="text-xl font-bold text-gray-900 mb-4">
                  There's no secret to building a life-changing YouTube channel.
                </p>
                
                <p className="text-gray-700 text-lg mb-2">
                  It's just a matter of:
                </p>
              </div>
              
              <div className="space-y-6 mb-8">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{step.title}</h4>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-900 font-semibold text-lg mb-6">
                That's all it takes.
              </p>
              
              {finalNote && (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                  <p className="text-gray-700">{finalNote}</p>
                </div>
              )}
              
              <div className="text-center">
                {buttonText && buttonUrl && (
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium"
                    onClick={() => window.open(buttonUrl, "_blank")}
                  >
                    {buttonText}
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why This Framework Works:</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-xl mb-2 text-gray-900">Consistency Builds Trust</h4>
                <p className="text-gray-700">When you consistently deliver valuable content, your audience begins to trust you and looks forward to your videos.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-xl mb-2 text-gray-900">Value Creates Loyalty</h4>
                <p className="text-gray-700">Creating genuinely helpful and valuable content positions you as an expert and builds a loyal community.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-xl mb-2 text-gray-900">Long-Term Focus</h4>
                <p className="text-gray-700">The 2-year commitment ensures you develop the skills and body of work needed for sustainable success.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-xl mb-2 text-gray-900">Compound Growth</h4>
                <p className="text-gray-700">YouTube success compounds over time, with older videos continuing to generate views and subscribers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoutubeFrameworkSection;