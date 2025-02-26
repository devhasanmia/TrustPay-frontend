import { Link } from "react-router";
import { ReactNode } from "react";

type TQuickActionBoxProps = {
  to: string;
  text: string;
  icon: ReactNode;}

const QuickActionBox = ({ to, text, icon: Icon }: TQuickActionBoxProps) => {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200"
    >
      <button className="flex flex-col items-center justify-center space-y-2">
        {Icon}
        <span className="text-sm font-medium text-gray-700">{text}</span>
      </button>
    </Link>
  );
};

export default QuickActionBox;