
import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div className="mb-6 lg:mb-0 text-center sm:text-left">
          <h2 className="text-2xl font-bold">
            Job<span className="text-[#6A38C2]">Hunt</span>
          </h2>
          <p className="mt-4 text-sm text-gray-700 leading-relaxed">
            JobHunt helps you find the right job faster. Search thousands of
            jobs from top companies and build your career.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 lg:mb-0 text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#6A38C2] cursor-pointer transition-colors">
              Home
            </li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition-colors">
              Browse Jobs
            </li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition-colors">
              Companies
            </li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition-colors">
              Contact Us
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="mb-6 lg:mb-0 text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#6A38C2] cursor-pointer transition-colors">
              Resume Tips
            </li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition-colors">
              Interview Prep
            </li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition-colors">
              Career Advice
            </li>
            <li className="hover:text-[#6A38C2] cursor-pointer transition-colors">
              Help Center
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center sm:justify-start gap-4 flex-wrap">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 text-[#6A38C2] cursor-pointer transition-colors" />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-400 text-[#6A38C2] cursor-pointer transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 hover:text-blue-600 text-[#6A38C2] cursor-pointer transition-colors" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 hover:text-pink-500 text-[#6A38C2] cursor-pointer transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 mt-10 py-4 px-4 text-center text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} JobHunt. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
