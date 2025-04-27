import React from "react";
import { Button } from "@/components/ui/button";
import scholarshipImage from "@assets/image_1745779716880.png";

interface ScholarshipSectionProps {
  title?: string;
  description?: string;
  requirements?: string[];
  applicationProcess?: string[];
  buttonText?: string;
  buttonUrl?: string;
  backgroundColor?: string;
}

const ScholarshipSection: React.FC<ScholarshipSectionProps> = ({
  title = "Scholarships",
  description = "We know that some people might not be able to afford PTYA and we don't want the price to exclude individuals who are passionate about successfully growing their YouTube channel.",
  requirements = [
    "To apply, you must be over 18 and have an existing YouTube channel with at least 3 published, full length videos (not just Shorts)."
  ],
  applicationProcess = [
    "If you meet these requirements, please write answers to ALL the questions in this form and attach a link to an Unlisted YouTube video – NO LONGER than 2 minutes in length – introducing yourself, explaining why you'd benefit from the course, why you're applying for a scholarship, and finally what your goals and aspirations are for your channel.",
    "Applications which don't answer all the questions, or which provide a video longer than 2 minutes, won't be considered.",
    "Feel free to submit your application here.",
    "Thanks and good luck!",
    "(Please make sure your application video is 'Unlisted' rather than 'Private' otherwise we won't be able to see it!)"
  ],
  buttonText = "Apply for Scholarship",
  buttonUrl = "#apply-now",
  backgroundColor = "#f9fafe",
}) => {
  return (
    <section 
      className="w-full py-16 md:py-24" 
      style={{ backgroundColor: backgroundColor || "#f9fafe" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-8 relative overflow-hidden">
              <div className="flex items-center mb-6">
                <img 
                  src={scholarshipImage} 
                  alt="Scholarship icon" 
                  className="w-14 h-14 mr-4" 
                />
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
              </div>
              
              <p className="text-gray-700 mb-6 text-lg">{description}</p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">That's why we're offering some scholarship options to individuals who can show an enthusiasm and passion for growing their channel and who'd benefit from the content of the course.</h3>
                
                {requirements && requirements.length > 0 && (
                  <div className="mb-6">
                    {requirements.map((requirement, i) => (
                      <p key={i} className="text-gray-700 mb-3">{requirement}</p>
                    ))}
                  </div>
                )}
                
                {applicationProcess && applicationProcess.length > 0 && (
                  <div>
                    {applicationProcess.map((step, i) => (
                      <p key={i} className="text-gray-700 mb-3">{step}</p>
                    ))}
                  </div>
                )}
              </div>
              
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
          
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Scholarship Application Process</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Meet the Requirements</h4>
                    <p className="text-gray-700">Be over 18 with at least 3 published videos on your YouTube channel.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Create Your Application Video</h4>
                    <p className="text-gray-700">Record a 2-minute (maximum) unlisted YouTube video introducing yourself and explaining why you'd benefit from the course.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Complete the Application Form</h4>
                    <p className="text-gray-700">Fill out the complete application form, answering ALL questions and including your video link.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Wait for Response</h4>
                    <p className="text-gray-700">We review all completed applications and will be in touch if you're selected.</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="flex items-center text-yellow-800 font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  Important Note
                </h4>
                <p className="text-yellow-800 mt-1">Applications that don't answer all questions or have videos longer than 2 minutes won't be considered.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipSection;