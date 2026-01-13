// interface ToggleCardProps {
//   label: string;
//   icon: React.ReactNode;
//   active: boolean;
//   onClick: () => void;
// }

// export default function ToggleCard({
//   label,
//   icon,
//   active,
//   onClick,
// }: ToggleCardProps) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-all
//         ${active
//           ? "bg-emerald-500/20 border-emerald-400"
//           : "bg-white/5 border-white/10 hover:bg-white/10"}`}
//     >
//       <div className="text-xl">{icon}</div>
//       <span className="text-sm font-medium">{label}</span>
//     </button>
//   );
// }




// Single Toggle Card Version
// interface ToggleCardProps {
//   label: string;
//   icon: string;
//   active: boolean;
//   onToggle: () => void;
// }

// const ToggleCard = ({ label, icon, active, onToggle }: ToggleCardProps) => {
//   return (
//     <button
//       type="button"
//       onClick={onToggle}
//       className={`w-full p-5 rounded-xl border transition-all duration-300 
//         backdrop-blur-md text-center
//         ${
//           active
//             ? "border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/20"
//             : "border-white/10 bg-white/5 hover:bg-white/10"
//         }`}
//     >
//       <div className="text-3xl mb-2">{icon}</div>
//       <div
//         className={`text-sm font-medium ${
//           active ? "text-emerald-300" : "text-gray-300"
//         }`}
//       >
//         {label}
//       </div>
//     </button>
//   );
// };

// export default ToggleCard;



// Simplified Toggle Card Version 2 Seperate Button
// interface ToggleCardProps {
//   label: string;
//   icon: string;
//   active: boolean;
//   onToggle: () => void;
// }

// export default function ToggleCard({
//   label,
//   icon,
//   active,
//   onToggle,
// }: ToggleCardProps) {
//   return (
//     <button
//       type="button"
//       onClick={onToggle}
//       className={`
//         flex items-center justify-center gap-2
//         px-4 py-3 rounded-xl w-full
//         transition-all duration-200
//         backdrop-blur-md border
//         ${
//           active
//             ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg"
//             : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
//         }
//       `}
//     >
//       <span className="text-xl">{icon}</span>
//       <span className="text-sm font-medium">{label}</span>
//     </button>
//   );
// }


// interface ToggleCardProps {
//   label: string;
//   icon: string;
//   active: boolean;
//   onToggle: () => void;
// }

// export default function ToggleCard({ label, icon, active, onToggle }: ToggleCardProps) {
//   return (
//     <button
//       onClick={onToggle}
//       className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
//         active
//           ? "bg-white/10 border-white/20 text-white"
//           : "bg-transparent border-gray-500 text-gray-300 hover:border-white/10 hover:text-white"
//       }`}
//     >
//       <span>{icon}</span>
//       <span className="font-medium text-sm">{label}</span>
//     </button>
//   );
// }


interface ToggleCardProps {
  label: string;
  icon: string;
  active: boolean;
  onToggle: () => void;
}

export default function ToggleCard({ label, icon, active, onToggle }: ToggleCardProps) {
  return (
    <button
      type="button" // ✅ Important: prevents form submission on Enter
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") { // Space or Enter toggles
          e.preventDefault(); // ✅ Prevent form submit
          onToggle();
        }
      }}
      className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all
        ${active
          ? "bg-white/10 border-white/20 text-white"
          : "bg-transparent border-gray-500 text-gray-300 hover:border-white/10 hover:text-white"
        }`}
    >
      <span>{icon}</span>
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}
