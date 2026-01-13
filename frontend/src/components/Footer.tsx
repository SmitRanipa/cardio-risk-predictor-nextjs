// import { HeartPulse } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="mt-20 border-t border-white/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          
//           {/* Left Side */}
//           <div className="flex items-center gap-2 text-center md:text-left">
//             <HeartPulse className="w-4 h-4 text-red-400" />
//             <span>
//               CardioGuard — AI-powered cardiovascular risk assessment tool
//             </span>
//           </div>

//           {/* Right Side */}
//           <div className="text-center md:text-right">
//             Designed by{" "}
//             <span className="text-gray-300 font-medium">
//               Smit Ranipa
//             </span>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// }

// import { HeartPulse } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="mt-20 border-t border-white/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          
//           {/* Left Side */}
//           <div className="flex items-center gap-2 text-center md:text-left">
//             {/* Increased icon size and aligned center */}
//             <HeartPulse className="w-5 h-5 md:w-4 md:h-4 text-red-400 flex-shrink-0" />
//             <span className="leading-tight">
//               CardioGuard — AI-powered cardiovascular risk assessment tool
//             </span>
//           </div>

//           {/* Right Side */}
//           <div className="text-center md:text-right">
//             Designed by{" "}
//             <span className="text-gray-300 font-medium">
//               Smit Ranipa
//             </span>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// }


import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">

          {/* Left side: Heart + Text together */}
          <div className="flex items-center gap-2 text-center md:text-left">
            <HeartPulse className="w-6 h-6 text-red-400 flex-shrink-0" />
            <span className="leading-tight">
              CardioGuard — AI-powered cardiovascular risk assessment tool
            </span>
          </div>

          {/* Right side: Designer */}
          <div className="text-center md:text-right">
            Designed by{" "}
            <span className="text-gray-300 font-medium">
              Smit Ranipa
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}