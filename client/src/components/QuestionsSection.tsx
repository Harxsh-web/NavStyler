import React from 'react';
import { Mail } from 'lucide-react';

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

  const {
    title = "Questions?",
    subtitle = "Still not sure or just want to chat?",
    contactText = "Contact us at",
    contactEmail = "support@lukemikic.com",
    description = "If you've got any questions about whether the course is right for you, drop us an email and we'll get back to you as soon as possible.",
    backgroundColor = "bg-white"
  } = questionsSection;

  return (
    <section id="contact" className={`py-20 ${backgroundColor}`}>
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="mb-8">
          <Mail className="h-12 w-12 text-cyan-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
          <p className="text-xl text-gray-700 mb-2">{subtitle}</p>
          <p className="text-lg">
            {contactText} <a href={`mailto:${contactEmail}`} className="text-cyan-600 font-semibold hover:underline">{contactEmail}</a>
          </p>
        </div>
        
        {description && (
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-700">{description}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuestionsSection;