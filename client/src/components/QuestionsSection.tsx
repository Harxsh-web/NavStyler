import React from "react";
import { FaQuestion } from "react-icons/fa";

interface QuestionsSectionProps {
  title?: string;
  subtitle?: string;
  contactText?: string;
  contactEmail?: string;
  description?: string;
  backgroundColor?: string;
}

const QuestionsSection: React.FC<{ questionsSection?: QuestionsSectionProps }> = ({ 
  questionsSection 
}) => {
  if (!questionsSection) return null;
  
  // Map the response data
  const data = questionsSection || {};
  
  // Extract properties with fallbacks
  const title = data.title || "Questions?";
  const subtitle = data.subtitle || "Still not sure or just want to chat?";
  const contactText = data.contactText || "Contact us at";
  const contactEmail = data.contactEmail || "support@lukemikic.com";
  const description = data.description || "If you've got any questions about the Academy, or need a hand with anything else, we're just an email away. Drop us a we'll and we'll do our best to help 😊";
  const backgroundColor = data.backgroundColor || "bg-gray-50";

  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            <p className="text-lg md:text-xl font-medium text-gray-700">{subtitle}</p>
            
            <p className="text-gray-700">
              {contactText} <a href={`mailto:${contactEmail}`} className="font-semibold text-blue-600 hover:underline">{contactEmail}</a>
            </p>
            
            <p className="text-gray-700">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;