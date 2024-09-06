import { useState } from "react";

export default function ChatAndSupportCard({ title, desc }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="BoxShadow cardShadow my-5 overflow-hidden">
      <div
        className="bg-white p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold sm:text-base">{title}</h2>
        <svg
          className={`text-grey-900 w-6 h-6 sm:w-4 sm:h-4 transform transition-transform duration-300 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      {isOpen && (
        <div className=" p-4 pt-0 text-[#ABABAB] sm:text-sm">
          <p>{desc}</p>
        </div>
      )}
    </div>
  );
}
