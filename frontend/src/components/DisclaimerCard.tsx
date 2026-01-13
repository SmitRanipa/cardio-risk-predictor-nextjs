// import { ShieldAlert } from "lucide-react"

// export default function DisclaimerCard() {
//   return (
//     <div className="mt-10 w-full max-w-6xl mx-auto glass-card p-6 md:p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 ">
//       <h3 className="text-lg font-semibold text-red-400 mb-3">
//         <ShieldAlert className="text-red-400" /> Important Disclaimer
//       </h3>

//       <p className="text-sm text-gray-400 leading-relaxed">
//         This cardiovascular risk assessment is generated using a machine learning
//         model trained on historical data. It is intended for
//         <span className="font-medium text-white"> educational and research purposes only </span>
//         and does not constitute medical advice.
//       </p>

//       <p className="mt-3 text-sm text-gray-400 leading-relaxed">
//         If you experience symptoms such as chest pain, shortness of breath,
//         dizziness, or fainting, please consult a qualified healthcare
//         professional or emergency services immediately.
//       </p>
//     </div>
//   );
// }

import { ShieldAlert } from "lucide-react";

export default function DisclaimerCard() {
  return (
    <div className="mt-10 w-full max-w-6xl mx-auto glass-card p-6 md:p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-3">
        <ShieldAlert className="w-6 h-6 text-red-400 flex-shrink-0" />
        <h3 className="text-lg font-semibold text-red-400">
          Important Disclaimer
        </h3>
      </div>

      {/* Paragraphs */}
      <p className="text-sm text-gray-400 leading-relaxed">
        This cardiovascular risk assessment is generated using a machine
        learning model trained on historical data. It is intended for
        <span className="font-medium text-white"> educational and research purposes only </span>
        and does not constitute medical advice.
      </p>

      <p className="mt-3 text-sm text-gray-400 leading-relaxed">
        If you experience symptoms such as chest pain, shortness of breath,
        dizziness, or fainting, please consult a qualified healthcare
        professional or emergency services immediately.
      </p>
    </div>
  );
}
