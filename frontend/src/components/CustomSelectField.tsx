// import { useState, useRef, useEffect } from "react";
// import { ChevronDown } from "lucide-react";

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface SelectFieldProps {
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
//   options: SelectOption[];
//   required?: boolean;
// }

// export default function SelectField({
//   label,
//   name,
//   value,
//   onChange,
//   options,
//   required = true,
// }: SelectFieldProps) {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSelect = (optionValue: string) => {
//     const event = {
//       target: { name, value: optionValue },
//     } as unknown as React.ChangeEvent<HTMLSelectElement>;

//     onChange(event);
//     setOpen(false); // auto-close
//   };

//   const selectedLabel = options.find((o) => o.value === value)?.label || "";

//   return (
//     <div className="form-group" ref={ref}>
//       <label className="input-label">
//         {label} {required && <span className="text-red-400">*</span>}
//       </label>

//       <div
//         className="relative cursor-pointer"
//         onClick={() => setOpen((prev) => !prev)}
//       >
//         {/* Selected value */}
//         <div
//           className={`custom-select flex justify-between items-center ${
//             open ? "border-blue-500/50 ring-2 ring-blue-500/30" : ""
//           }`}
//         >
//           <span>{selectedLabel}</span>
//           <ChevronDown
//             className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}
//           />
//         </div>

//         {/* Options */}
//         {open && (
//           <div className="absolute z-50 mt-1 w-full bg-black border border-white/20 rounded-xl shadow-lg max-h-60 overflow-auto">
//             {options.map((option) => (
//               <div
//                 key={option.value}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleSelect(option.value);
//                 }}
//                 className={`px-4 py-3 hover:bg-blue-500/20 cursor-pointer transition-all ${
//                   option.value === value ? "bg-blue-500/30" : ""
//                 }`}
//               >
//                 {option.label}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import { ChevronDown } from "lucide-react";

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface SelectFieldProps {
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   options: SelectOption[];
//   required?: boolean;
// }

// export default function SelectField({
//   label,
//   name,
//   value,
//   onChange,
//   options,
//   required = true,
// }: SelectFieldProps) {
//   const [open, setOpen] = useState(false);
//   const [focusedIndex, setFocusedIndex] = useState(-1);

//   const rootRef = useRef<HTMLDivElement>(null);
//   const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // Close on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
//         setOpen(false);
//         setFocusedIndex(-1);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // Scroll focused option
//   useEffect(() => {
//     if (focusedIndex >= 0) {
//       optionRefs.current[focusedIndex]?.scrollIntoView({
//         block: "nearest",
//       });
//     }
//   }, [focusedIndex]);

//   const handleSelect = (val: string) => {
//     const event = {
//       target: { name, value: val },
//     } as React.ChangeEvent<HTMLSelectElement>;

//     onChange(event);
//     setOpen(false);
//     setFocusedIndex(-1);
//   };

//   const selectedLabel =
//     options.find((o) => o.value === value)?.label || "Select";

//   return (
//     <div className="form-group" ref={rootRef}>
//       <label className="input-label">
//         {label} {required && <span className="text-red-400">*</span>}
//       </label>

//       {/* ROOT CONTROL */}
//       <div
//         tabIndex={0}
//         role="combobox"
//         aria-expanded={open}
//         aria-haspopup="listbox"
//         className="relative cursor-pointer"
//         /* 🔥 CRITICAL FIX */
//         onKeyDownCapture={(e) => {
//           if (["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
//             e.preventDefault();
//           }

//           switch (e.key) {
//             case "Enter":
//               if (!open) {
//                 setOpen(true);
//                 setFocusedIndex(
//                   Math.max(
//                     0,
//                     options.findIndex((o) => o.value === value)
//                   )
//                 );
//               } else if (focusedIndex >= 0) {
//                 handleSelect(options[focusedIndex].value);
//               }
//               break;

//             case "ArrowDown":
//               if (!open) {
//                 setOpen(true);
//                 setFocusedIndex(0);
//               } else {
//                 setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
//               }
//               break;

//             case "ArrowUp":
//               if (!open) {
//                 setOpen(true);
//                 setFocusedIndex(options.length - 1);
//               } else {
//                 setFocusedIndex((i) => Math.max(i - 1, 0));
//               }
//               break;

//             case "Escape":
//               setOpen(false);
//               setFocusedIndex(-1);
//               break;
//           }
//         }}
//         onClick={() => {
//           setOpen(true);
//           setFocusedIndex(
//             Math.max(
//               0,
//               options.findIndex((o) => o.value === value)
//             )
//           );
//         }}
//       >
//         {/* DISPLAY */}
//         <div
//           className={`custom-select flex justify-between items-center ${
//             open ? "ring-2 ring-blue-500/40" : ""
//           }`}
//         >
//           <span>{selectedLabel}</span>
//           <ChevronDown
//             className={`transition-transform ${open ? "rotate-180" : ""}`}
//           />
//         </div>

//         {/* OPTIONS */}
//         {open && (
//           <div
//             role="listbox"
//             className="absolute z-50 mt-1 w-full bg-black border border-white/20 rounded-xl max-h-60 overflow-auto"
//           >
//             {options.map((opt, i) => (
//               <div
//                 key={opt.value}
//                 ref={(el) => {
//                   optionRefs.current[i] = el;
//                 }}
//                 role="option"
//                 aria-selected={opt.value === value}
//                 className={`px-4 py-3 cursor-pointer
//                   ${
//                     i === focusedIndex
//                       ? "bg-blue-500/40"
//                       : "hover:bg-blue-500/20"
//                   }
//                 `}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleSelect(opt.value);
//                 }}
//               >
//                 {opt.label}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// UI Improve

// import { useState, useRef, useEffect } from "react";
// import { ChevronDown } from "lucide-react";

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface SelectFieldProps {
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   options: SelectOption[];
//   required?: boolean;
// }

// export default function SelectField({
//   label,
//   name,
//   value,
//   onChange,
//   options,
//   required = true,
// }: SelectFieldProps) {
//   const [open, setOpen] = useState(false);
//   const [focusedIndex, setFocusedIndex] = useState(-1);

//   const rootRef = useRef<HTMLDivElement>(null);
//   const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // Close on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
//         setOpen(false);
//         setFocusedIndex(-1);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   useEffect(() => {
//     if (focusedIndex >= 0) {
//       optionRefs.current[focusedIndex]?.scrollIntoView({
//         block: "nearest",
//       });
//     }
//   }, [focusedIndex]);

//   const handleSelect = (val: string) => {
//     const event = {
//       target: { name, value: val },
//     } as React.ChangeEvent<HTMLSelectElement>;
//     onChange(event);
//     setOpen(false);
//     setFocusedIndex(-1);
//   };

//   const selectedLabel =
//     options.find((o) => o.value === value)?.label || "Select";

//   return (
//     <div className="form-group" ref={rootRef}>
//       <label className="input-label">
//         {label} {required && <span className="text-red-400">*</span>}
//       </label>

//       <div
//         tabIndex={0}
//         role="combobox"
//         aria-expanded={open}
//         aria-haspopup="listbox"
//         className="relative cursor-pointer"
//         onKeyDownCapture={(e) => {
//           if (["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
//             e.preventDefault();
//           }
//           switch (e.key) {
//             case "Enter":
//               if (!open) {
//                 setOpen(true);
//                 setFocusedIndex(
//                   Math.max(
//                     0,
//                     options.findIndex((o) => o.value === value)
//                   )
//                 );
//               } else if (focusedIndex >= 0) {
//                 handleSelect(options[focusedIndex].value);
//               }
//               break;
//             case "ArrowDown":
//               if (!open) {
//                 setOpen(true);
//                 setFocusedIndex(0);
//               } else {
//                 setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
//               }
//               break;
//             case "ArrowUp":
//               if (!open) {
//                 setOpen(true);
//                 setFocusedIndex(options.length - 1);
//               } else {
//                 setFocusedIndex((i) => Math.max(i - 1, 0));
//               }
//               break;
//             case "Escape":
//               setOpen(false);
//               setFocusedIndex(-1);
//               break;
//           }
//         }}
//         onClick={() => {
//           setOpen(true);
//           setFocusedIndex(
//             Math.max(
//               0,
//               options.findIndex((o) => o.value === value)
//             )
//           );
//         }}
//       >
//         {/* DISPLAY */}
//         <div
//           className={`custom-select flex justify-between items-center p-3 rounded-xl border border-white/20 bg-white/5 text-white transition-all ${
//             open ? "ring-2 ring-white/20" : ""
//           }`}
//         >
//           <span>{selectedLabel}</span>
//           <ChevronDown
//             className={`transition-transform ${open ? "rotate-180" : ""}`}
//           />
//         </div>

//         {/* OPTIONS */}
//         {open && (
//           <div
//             role="listbox"
//             className="absolute z-50 mt-1 w-full glass-card p-1 rounded-xl max-h-60 overflow-auto border border-white/20"
//           >
//             {options.map((opt, i) => (
//               <div
//                 key={opt.value}
//                 ref={(el) => {
//                   optionRefs.current[i] = el;
//                 }}
//                 role="option"
//                 aria-selected={opt.value === value}
//                 className={`px-4 py-2 cursor-pointer rounded-lg transition-colors ${
//                   i === focusedIndex
//                     ? "bg-white/10"
//                     : opt.value === value
//                     ? "bg-white/5"
//                     : "hover:bg-white/10"
//                 }`}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleSelect(opt.value);
//                 }}
//               >
//                 {opt.label}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = true,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on blur / tab key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setOpen(false);
        setFocusedIndex(-1);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (focusedIndex >= 0) {
      optionRefs.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [focusedIndex]);

  const handleSelect = (val: string) => {
    const event = {
      target: { name, value: val },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(event);
    setOpen(false);
    setFocusedIndex(-1);
  };

  const selectedLabel =
    options.find((o) => o.value === value)?.label || "Select";

  return (
    <div className="form-group relative" ref={rootRef}>
      <label className="input-label">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      {/* ROOT CONTROL */}
      <div
        tabIndex={0}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="relative cursor-pointer"
        onKeyDownCapture={(e) => {
          if (["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
            e.preventDefault();
          }
          switch (e.key) {
            case "Enter":
              if (!open) {
                setOpen(true);
                setFocusedIndex(
                  Math.max(
                    0,
                    options.findIndex((o) => o.value === value)
                  )
                );
              } else if (focusedIndex >= 0) {
                handleSelect(options[focusedIndex].value);
              }
              break;
            case "ArrowDown":
              if (!open) {
                setOpen(true);
                setFocusedIndex(0);
              } else {
                setFocusedIndex((i) => Math.min(i + 1, options.length - 1));
              }
              break;
            case "ArrowUp":
              if (!open) {
                setOpen(true);
                setFocusedIndex(options.length - 1);
              } else {
                setFocusedIndex((i) => Math.max(i - 1, 0));
              }
              break;
            case "Escape":
              setOpen(false);
              setFocusedIndex(-1);
              break;
          }
        }}
        onClick={() => {
          setOpen((prev) => !prev); // 🔥 toggle open/close
          setFocusedIndex(
            Math.max(
              0,
              options.findIndex((o) => o.value === value)
            )
          );
        }}
      >
        {/* DISPLAY */}
        <div
          className={`custom-select flex justify-between items-center p-3 rounded-xl border border-white/20 bg-white/5 text-white transition-all ${
            open ? "ring-2 ring-white/20" : ""
          }`}
        >
          <span>{selectedLabel}</span>
          <ChevronDown
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>

        {/* OPTIONS */}
        {open && (
          <div
            role="listbox"
            className="absolute z-50 mt-1 w-full bg-black backdrop-blur-sm p-1 rounded-xl max-h-60 overflow-auto border border-white/20"
          >
            {options.map((opt, i) => (
              <div
                key={opt.value}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                role="option"
                aria-selected={opt.value === value}
                className={`px-4 py-2 cursor-pointer rounded-lg transition-colors ${
                  i === focusedIndex
                    ? "bg-white/20"
                    : opt.value === value
                    ? "bg-white/10"
                    : "hover:bg-white/10"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(opt.value);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
