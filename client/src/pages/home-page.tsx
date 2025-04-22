import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Feel-Good <span className="text-cyan-500 relative">Productivity
              <span className="absolute bottom-1 left-0 w-full h-1 bg-cyan-500"></span>
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
            The science-based guide to achieving more while feeling good in the process.
          </p>
          
          {/* Placeholder for the book image and hero section */}
          <div className="bg-gray-100 p-12 rounded-lg mb-16 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Discover a Better Way to Work and Live</h2>
              <p className="text-gray-600 mb-6">
                In Feel-Good Productivity, Dr. Ali Abdaal draws on his experience as a doctor and entrepreneur to help you find sustainable ways to be more productive without sacrificing your wellbeing.
              </p>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-6 rounded-md transition">
                Get the Book
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white shadow-lg rounded-md h-64 w-48 flex items-center justify-center">
                <span className="text-gray-400">Book Cover Image</span>
              </div>
            </div>
          </div>
          
          {/* Quote section */}
          <div className="max-w-3xl mx-auto mb-16 px-4 py-10 bg-yellow-50 rounded-lg text-center">
            <p className="text-xl md:text-2xl font-medium italic text-gray-700 mb-4">
              "Productivity isn't about how much you do, it's about how good you feel about what you're doing."
            </p>
            <p className="text-gray-500">— Dr. Ali Abdaal</p>
          </div>
          
          {/* "10 Things" section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">10 Things This Book Will Teach You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div key={num} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <span className="bg-cyan-100 text-cyan-800 text-sm font-medium px-2.5 py-0.5 rounded-full mb-3 inline-block">
                    #{num}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">Learning Point {num}</h3>
                  <p className="text-gray-600">
                    A description of what you'll learn about productivity and feeling good while doing it.
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Testimonials section */}
          <div className="mb-16 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">What People Are Saying</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((num) => (
                <div key={num} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-semibold">Testimonial Person {num}</h4>
                      <p className="text-gray-500 text-sm">Position or Title</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "This book changed how I approach my work and life. The principles are easy to follow and actually make you feel good while being productive."
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Author section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">About the Author</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 flex justify-center">
                <div className="w-48 h-48 bg-gray-200 rounded-full"></div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-2">Dr. Ali Abdaal</h3>
                <p className="text-gray-600 mb-4">
                  Ali Abdaal is a doctor, YouTuber, podcaster, and entrepreneur. His YouTube channel
                  has over 3 million subscribers, and his Sunday Snippets newsletter has over 500,000 subscribers.
                </p>
                <p className="text-gray-600">
                  Ali's mission is to help people live happier, healthier, more productive lives by sharing evidence-based
                  strategies for feeling good while doing more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}