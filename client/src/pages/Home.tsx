import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#FAF9F6] pt-10 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1A1A] mb-6 leading-tight">
                Feel-Good Productivity
              </h1>
              <div className="mb-6">
                <p className="text-xl text-gray-700 mb-1">
                  The <em>Sunday Times</em> and <em>New York Times</em> Bestseller
                </p>
                <p className="text-xl text-gray-700 mb-1">
                  250,000+ Copies Sold
                </p>
                <p className="text-xl text-gray-700">
                  Now available in paperback across Europe, Asia and Australia
                </p>
              </div>
              <div className="mt-8">
                <Button className="bg-[#FF9470] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-full text-lg">
                  Get the Book
                </Button>
              </div>
            </div>

            <div className="relative mx-auto lg:ml-auto max-w-[350px] md:max-w-[400px]">
              <div className="rounded-xl overflow-hidden">
                <div className="bg-yellow-400 p-6 text-center rounded-t-xl">
                  <p className="text-sm font-medium mb-1">The world's most-followed productivity expert</p>
                  <h3 className="text-3xl font-bold">Ali Abdaal</h3>
                </div>
                <div className="grid grid-cols-2">
                  <div className="bg-[#30B8C4] text-white p-6 flex items-center justify-center text-3xl font-bold">
                    Feel
                  </div>
                  <div className="bg-red-500 text-white p-6 flex items-center justify-center text-3xl font-bold">
                    Good
                  </div>
                </div>
                <div className="bg-pink-400 text-white p-6 flex items-center justify-center text-3xl font-bold">
                  Productivity
                </div>
                <div className="bg-green-500 text-white p-5 rounded-b-xl text-center">
                  <p className="font-medium text-lg">How to Do More of<br/>What Matters to You</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-2">About the Book</h2>
              <p className="text-gray-600">
                Learn about the revolutionary approach to productivity that focuses on
                feeling good while getting things done. Break free from the traditional
                productivity advice that leaves you feeling burnt out.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-2">What You'll Learn</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>The Feel-Good Productivity Method</li>
                <li>How to overcome procrastination</li>
                <li>Building sustainable productivity habits</li>
                <li>Balancing work, rest, and play</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
