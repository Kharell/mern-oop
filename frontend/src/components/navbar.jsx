import React, { useState, useEffect } from "react";

const FullNavbarExperience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mengatur perubahan style navbar saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
        className={`fixed z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/70 py-3 shadow-xl backdrop-blur-lg"
            : "bg-transparent py-6"
        }`}>
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 shadow-lg">
                <span className="text-xl font-bold text-white">G</span>
              </div>
              <span
                className={`text-2xl font-black tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-gray-900" : "text-gray-800"
                }`}>
                GEMINI<span className="text-indigo-600">.</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-10 md:flex">
              <ul className="flex space-x-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group relative text-sm font-semibold text-gray-600 transition-colors hover:text-indigo-600">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>

              <button className="rounded-full bg-indigo-600 px-7 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-indigo-200 hover:shadow-lg active:scale-95">
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`rounded-lg p-2 transition-colors ${
                  scrolled ? "bg-gray-100" : "bg-white/20"
                }`}>
                <svg
                  className="h-6 w-6 text-gray-800"
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
          className={`absolute w-full overflow-hidden border-b border-gray-100 bg-white/95 transition-all duration-300 ease-in-out backdrop-blur-xl md:hidden ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 pointer-events-none opacity-0"
          }`}>
          <div className="space-y-4 px-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-lg font-bold text-gray-800 hover:text-indigo-600">
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <button className="w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white shadow-lg">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* --- NAVBAR END --- */}

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-32 md:pt-48">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
            Modern UI Components
          </span>
          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-gray-900 md:text-7xl">
            Build Faster with <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Elegant Design.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Ini adalah contoh implementasi Navbar dengan React dan Tailwind CSS.
            Scroll ke bawah untuk melihat transisi navbar yang halus.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-2xl bg-gray-900 px-8 py-4 font-bold text-white transition-all hover:bg-gray-800">
              Get Started
            </button>
            <button className="rounded-2xl border border-gray-200 bg-white px-8 py-4 font-bold text-gray-700 transition-all hover:bg-gray-50">
              View Demo
            </button>
          </div>
        </div>

        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2 pointer-events-none">
          <div className="absolute top-24 left-10 h-72 w-72 rounded-full bg-indigo-300 opacity-20 mix-blend-multiply blur-3xl"></div>
          <div className="absolute top-24 right-10 h-72 w-72 rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-3xl"></div>
        </div>
      </section>

      {/* Spacer untuk scroll */}
      <div className="flex h-screen items-center justify-center bg-white">
        <p className="font-medium text-gray-400">
          Scroll terus untuk melihat efek Navbar tetap di atas...
        </p>
      </div>
    </div>
  );
};

export default FullNavbarExperience;
