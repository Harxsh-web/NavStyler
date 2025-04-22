import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-2xl font-medium text-gray-600 mt-4">Page not found</p>
        <p className="text-gray-500 mt-2 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/">
          <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
            Go back home
          </a>
        </Link>
      </div>
    </div>
  );
}