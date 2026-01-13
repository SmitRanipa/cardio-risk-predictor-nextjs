// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";
// import { Menu, X, Heart } from "lucide-react";

// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "Insights", path: "/insights" },
//   { name: "About", path: "/about" },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? "navbar-glass shadow-lg"
//           : "bg-black/50 backdrop-blur-md border-b border-white/5"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="flex items-center gap-3 group"
//             onClick={() => setIsOpen(false)}
//           >
//             {/* <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
//               <div className="relative bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg">
//                 <Heart className="w-5 h-5 text-white" />
//               </div>
//             </div> */}
//             {/* <span className="text-xl font-bold bg-gradient-to-r from-red-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
//               CardioGuard
//             </span> */}

//             <span
//               className="text-white font-bold text-xl px-3 py-1 rounded-lg 
//                           bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-md
//                           shadow-sm"
//             >
//               CardioGuard
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-1">
//             {navItems.map((item) => {
//               const isActive = pathname === item.path;
//               return (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                     isActive ? "text-white" : "text-gray-400 hover:text-white"
//                   }`}
//                 >
//                   <span className="relative z-10">{item.name}</span>
//                   {isActive && (
//                     <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg border border-blue-500/30"></span>
//                   )}
//                   {!isActive && (
//                     <span className="absolute inset-0 rounded-lg hover:bg-white/5 transition-colors"></span>
//                   )}
//                 </Link>
//               );
//             })}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
//             aria-label="Toggle menu"
//           >
//             {isOpen ? (
//               <X className="w-6 h-6 text-white" />
//             ) : (
//               <Menu className="w-6 h-6 text-white" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         <div
//           className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//             isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
//           }`}
//         >
//           <div className="pt-4 space-y-2 border-t border-white/10">
//             {navItems.map((item) => {
//               const isActive = pathname === item.path;
//               return (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   onClick={() => setIsOpen(false)}
//                   className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
//                     isActive
//                       ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/30"
//                       : "text-gray-400 hover:bg-white/5 hover:text-white"
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "navbar-glass shadow-lg"
          : "bg-black/50 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <span
              className="text-white font-bold text-xl px-3 py-1 rounded-lg
              bg-gradient-to-br from-white/5 via-white/10 to-white/5
              backdrop-blur-md shadow-sm"
            >
              CardioGuard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* Active background */}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-lg
                      bg-gradient-to-br from-white/10 via-white/5 to-white/10
                      border border-white/20 backdrop-blur-sm"
                    />
                  )}

                  {/* Hover background */}
                  {!isActive && (
                    <span
                      className="absolute inset-0 rounded-lg
                      hover:bg-white/10 transition-colors"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 space-y-2 border-t border-white/10">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-br from-white/10 via-white/5 to-white/10 text-white border border-white/20 backdrop-blur-sm"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
