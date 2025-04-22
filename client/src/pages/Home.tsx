import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">Feel-Good Productivity</h1>
        <p className="text-lg text-gray-600">The Sunday Times and New York Times Bestseller</p>
        <p className="text-gray-600">250,000+ Copies Sold</p>
      </div>
      
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
  );
}
