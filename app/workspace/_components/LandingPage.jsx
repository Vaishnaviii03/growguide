"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser, UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

const courses = [
  {
    title: "Advanced Python Programming",
    desc: "Master Python with hands-on projects and real-world use cases.",
    img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
  },
  {
    title: "Full Stack Web Development",
    desc: "HTML, CSS, JS, React, Node.js — Everything to become a full-stack pro.",
    img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
  },
  {
    title: "Machine Learning & AI",
    desc: "Learn ML from scratch, including algorithms, scikit-learn, and projects.",
    img: "https://images.pexels.com/photos/3861955/pexels-photo-3861955.jpeg",
  },
  {
    title: "Data Structures & Algorithms",
    desc: "Crack coding interviews with strong DSA skills and visual explanations.",
    img: "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg",
  },
];

export default function LandingPage() {
  const { user } = useUser();
  const router = useRouter();

  const handleProtectedRoute = (route) => {
    if (user) {
      router.push(route);
    } else {
      router.push(`/sign-in?redirect_url=${route}`);
    }
  };

  return (
    <div className="font-sans scroll-smooth bg-white text-gray-800">
      {/* Navbar */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              width={200}
              height={200}
              alt="GrowGuide Logo"
              className="cursor-pointer"
            />
          </Link>

          <nav className="space-x-6 hidden md:flex text-sm font-medium">
            <a href="#features" className="hover:text-purple-600 transition">
              Features
            </a>
            <a href="#courses" className="hover:text-purple-600 transition">
              Courses
            </a>
            <a href="#testimonials" className="hover:text-purple-600 transition">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-purple-600 transition">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleProtectedRoute("/workspace")}
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition shadow-md"
            >
              Launch App
            </button>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-md text-sm hover:bg-purple-50 transition">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">
              Build Courses with <span className="text-yellow-300">AI</span>. <br /> Learn Smarter.
            </h2>
            <p className="text-lg mb-6">
              Welcome to GrowGuide — a dynamic AI-powered platform where you can create and explore courses effortlessly with the help of Google Gemini AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleProtectedRoute("/workspace/explore")}
                className="bg-white text-purple-700 px-6 py-3 rounded-md font-semibold hover:bg-purple-100 transition"
              >
                🚀 Explore Courses
              </button>
              <button
                onClick={() => handleProtectedRoute("/workspace/my-learning")}
                className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-purple-700 transition font-semibold"
              >
                🎓 My Learning
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/online-education.png"
              width={600}
              height={400}
              alt="Hero Image"
              className="w-full h-auto object-contain rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-12 text-purple-600">Why GrowGuide?</h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "🧠",
                title: "AI Powered",
                desc: "Personalized learning paths with Gemini AI at core.",
              },
              {
                icon: "🎯",
                title: "Goal Oriented",
                desc: "Track your skills & progress with visual dashboards.",
              },
              {
                icon: "🧑‍💻",
                title: "Developer Focused",
                desc: "Real-world projects, code challenges, and dev tools.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl text-center border shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 text-purple-600">Popular Courses</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
              >
                <img src={course.img} alt={course.title} className="h-52 w-full object-cover" />
                <div className="p-5">
                  <h4 className="text-xl font-bold mb-2">{course.title}</h4>
                  <p className="text-gray-600">{course.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-12 text-purple-600">What Our Students Say</h3>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                name: "Anjali Verma",
                feedback: "GrowGuide helped me land my dream job in 3 months!",
              },
              {
                name: "Rahul Tiwari",
                feedback: "The course quality is unbeatable and instructors are super helpful.",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-gray-100 p-6 rounded-xl text-left border shadow-md hover:shadow-xl transition"
              >
                <p className="italic text-gray-700 mb-4">“{review.feedback}”</p>
                <div className="text-sm font-bold text-purple-700">{review.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-20 text-center px-6">
        <h3 className="text-4xl font-bold mb-4">Ready to Grow?</h3>
        <p className="mb-8 text-lg">Join thousands of learners and skill up with AI today.</p>
        <Link href="/sign-up">
          <button className="bg-white text-purple-700 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
            Join Now — It’s Free
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-10 text-sm px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div>
            <h5 className="font-bold mb-2">GrowGuide</h5>
            <p>Empowering future developers through AI-powered learning.</p>
          </div>
          <div>
            <h5 className="font-bold mb-2">Navigation</h5>
            <ul className="space-y-1">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#courses" className="hover:underline">Courses</a></li>
              <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Contact</h5>
            <p>Email: support@growguide.ai</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-8">© 2025 GrowGuide. Built with 💜 by Vaishnavi</p>
      </footer>
    </div>
  );
}
