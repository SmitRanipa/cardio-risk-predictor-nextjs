"use client";

import {
  Github,
  Linkedin,
  Mail,
  Award,
  Briefcase,
  Users,
  MapPin,
  Calendar,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 md:space-y-12">
          {/* Hero Section */}
          <div className="glass-card p-8 md:p-12 card-hover animate-fadeIn">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="absolute inset-0  rounded-full blur opacity-50 animate-pulse"></div>
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/10  flex items-center justify-center">
                  <div className="text-7xl">👨‍💻</div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Smit Ranipa
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-4">
                  AI/ML Engineer
                </p>

                <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>Gujrat , India</span>
                  </div>
                  {/* <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>6+ Years Experience</span>
                  </div> */}
                  {/* <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>25+ Projects</span>
                  </div> */}
                </div>

                <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8">
                  I am an intermediate Machine Learning student with a strong
                  foundation in ML fundamentals and a growing interest in
                  Artificial Intelligence. Currently, I am exploring Neural
                  Networks and deep learning concepts through hands-on projects.
                  I enjoy building and experimenting with models, understanding
                  how they work internally, and applying them to solve
                  real-world problems while continuously improving my skills as
                  an ML engineer.
                </p>

                <div className="flex gap-4 justify-center md:justify-start">
                  <a
                    href="https://github.com/SmitRanipa"
                    className="p-3 glass-card border-white/10 hover:border-white/20 transition-all card-hover hover:scale-105"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/smit-ranipa-110388315/"
                    className="p-3 glass-card border-white/10 hover:border-white/20 transition-all card-hover hover:scale-105"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="mailto:smitranipa@gmail.com"
                    className="p-3 glass-card border-white/10 hover:border-white/20 transition-all card-hover hover:scale-105"
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
                  <Footer />
          
        </div>
      </div>
    </div>
  );
}


