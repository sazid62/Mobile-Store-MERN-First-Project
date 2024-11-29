// @ts-nocheck
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
  
export default function Navbar() {
  return (

    <nav className="flex flex-col sm:flex-row items-center justify-between p-2 sm:px-4 sm:py-2 bg-blue-200 text-white space-y-2 sm:space-y-0">
      {/* Left Side: Logo */}
      <div className="flex items-center space-x-2">
      <Link to="/">
        <img
          src="https://www.svgrepo.com/show/494336/apple.svg"
          alt="logo"
          className="h-6 w-6 sm:h-8 sm:w-8"
        />
      </Link>
        <span className="text-black text-base sm:text-lg font-semibold">Iphone er Duniya</span>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-800 bg-white rounded-lg hover:bg-gray-200">
          <Link to="/create">Add Product</Link>
        </button>
        <ModeToggle />
      </div>
    </nav>
  );
}
