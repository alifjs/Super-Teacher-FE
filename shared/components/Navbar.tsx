import React from "react";
import { FaClock, FaBell, FaBars, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useRouter } from "next/router";

const Navbar = ({
  notifications = 0,
  setIsDialogOpen,
}: {
  notifications?: number;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {logout} = useLogout();
  const router = useRouter();

  const handleLogoutClick =async ()=>{
    setIsMenuOpen(false);
    await logout();
    await router.replace('/')
    router.reload()
  }

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold cursor-pointer sm:ml-8" onClick={() => router.push("/dashboard")}>Dashboard</div>
      <div className="flex items-center space-x-6">
      <FaPlus className="text-xl cursor-pointer" title="Add" onClick={() => setIsDialogOpen(true)}/>
        <FaClock className="text-xl" />
        <div className="relative">
          <FaBell className="text-xl" />
          {notifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>
        <div className="relative">
          <FaBars
            className="text-xl cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && (
            <div className="absolute top-8 right-0 bg-gray-800 text-white text-sm rounded shadow-lg py-2 w-32">
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-700"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
