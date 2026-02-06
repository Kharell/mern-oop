import React, { useState, useEffect } from "react";

const FullNavbarExperience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mengatur perubahan style navbar saat scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#" },
    { name: "Showcase", href: "#" },
    { name: "Pricing", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- NAVBAR START --- */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-lg shadow-xl py-3"
            : "bg-transparent py-6"
        }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span
                className={`text-2xl font-black tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-gray-900" : "text-gray-800"
                }`}>
                GEMINI<span className="text-indigo-600">.</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              <ul className="flex space-x-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="relative group text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>

              <button className="bg-indigo-600 text-white px-7 py-2.5 rounded-full font-bold text-sm hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95">
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  scrolled ? "bg-gray-100" : "bg-white/20"
                }`}>
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          } overflow-hidden`}>
          <div className="px-6 py-8 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-lg font-bold text-gray-800 hover:text-indigo-600">
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* --- NAVBAR END --- */}

      {/* --- HERO SECTION (Untuk testing scroll) --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-widest uppercase">
            Modern UI Components
          </span>
          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
            Build Faster with <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Elegant Design.
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ini adalah contoh implementasi Navbar dengan React dan Tailwind CSS.
            Scroll ke bawah untuk melihat transisi navbar yang halus.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all">
              Get Started
            </button>
            <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all">
              View Demo
            </button>
          </div>
        </div>

        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-24 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-24 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* Spacer untuk scroll */}
      <div className="h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400 font-medium">
          Scroll terus untuk melihat efek Navbar tetap di atas...
        </p>
      </div>
    </div>
  );
};

export default FullNavbarExperience;
