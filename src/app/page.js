'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white sticky top-0">
        <h1 className="text-2xl font-bold text-blue-600">TaskManager</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
          <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
        </nav>
        <div className="space-x-4">
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          Organize Your Life, One Task at a Time
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Stay productive, reduce stress, and accomplish more with our simple yet powerful task management app.
        </p>
        <button
          onClick={() => router.push('/register')}
          className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700"
        >
          Start for Free
        </button>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-gray-50 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose TaskManager?</h3>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-md">
            <h4 className="text-xl font-semibold mb-3">✅ Easy to Use</h4>
            <p className="text-gray-600">
              A clean and intuitive interface makes managing your tasks effortless.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-md">
            <h4 className="text-xl font-semibold mb-3">📊 Stay Organized</h4>
            <p className="text-gray-600">
              Filter tasks by status and never lose track of what’s pending or completed.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-md">
            <h4 className="text-xl font-semibold mb-3">🔒 Secure</h4>
            <p className="text-gray-600">
              Your data is safe and private with secure authentication.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-6">About TaskManager</h3>
        <p className="text-gray-600 leading-relaxed">
          TaskManager is built for individuals and teams who want to increase their productivity
          and reduce stress. Whether you’re managing personal goals or collaborative projects,
          TaskManager helps you stay on track with simplicity and ease.
        </p>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-blue-600 text-white py-8 text-center">
        <h4 className="text-lg font-semibold mb-2">Get in Touch</h4>
        <p className="text-sm mb-4">Have questions? Reach us at support@taskmanager.com</p>
        <p className="text-sm">© {new Date().getFullYear()} TaskManager. All rights reserved.</p>
      </footer>
    </div>
  );
}
