import { Button } from "@/components/ui/button";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";

interface ScholarshipSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundColor?: string;
}

const ScholarshipSection: React.FC<{ scholarshipSection?: ScholarshipSectionProps }> = ({ 
  scholarshipSection 
}) => {
  if (!scholarshipSection) return null;

  // Map the response data
  const data = scholarshipSection || {};
  
  // Extract properties with fallbacks
  const title = data.title || "Can't Afford The $995?";
  const subtitle = data.subtitle || "Scholarship Application";
  const description = data.description || "If you truly cannot afford the full price but are committed to building your YouTube channel, I'm offering scholarships based on need and dedication. Submit your application explaining your situation and YouTube goals.";
  const imageUrl = data.imageUrl || "/student-scholarship.jpg";
  const buttonText = data.buttonText || "Apply for Scholarship";
  const buttonUrl = data.buttonUrl || "#scholarship-application";
  const backgroundColor = data.backgroundColor || "bg-amber-50";

  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <FaGraduationCap className="text-blue-500 text-4xl mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
          <p className="text-xl font-medium text-gray-700">{subtitle}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
          <div className="md:w-1/2">
            <img 
              src={imageUrl} 
              alt="Scholarship Application" 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          <div className="md:w-1/2">
            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-gray-700">{description}</p>
            </div>
            
            <a
              href={buttonUrl}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-200 inline-block"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipSection;