import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const keywords = [
  "AC repair",
  "Plumber",
  "Electrician",
  "Washing machine repair",
  "Refrigerator repair",
  "TV repair",
];

export default function SearchBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % keywords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-64 items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5">
      <Search size={18} className="shrink-0 text-gray-500" />

      <input
        type="text"
        placeholder={`Search "${keywords[index]}"`}
        className="min-w-0 w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}
