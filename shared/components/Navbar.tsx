import React, { useEffect, useState } from "react";
import { FaClock, FaBell, FaBars, FaPlus } from "react-icons/fa";
import { useLogout } from "../hooks/useLogout";
import { useRouter } from "next/router";
import UserProfileModal from "./UserProfile";
import socket from "@/lib/socket";
import { useSelector } from "react-redux";
import { TRootState } from "../redux/store";
import { useGetNotificationsQuery } from "../redux/rtk-apis/notifications/notifications.api"; // Update import path

const Navbar = ({
  setIsDialogOpen,
}: {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const user = useSelector((state: TRootState) => state.authenticatedUser);
  const userId = user.userId;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { logout } = useLogout();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  
  const { data: notifications = [], refetch } = useGetNotificationsQuery();

  const handleLogoutClick = async () => {
    setIsMenuOpen(false);
    await logout();
    await router.replace("/");
    router.reload();
  };

  const handleBellClick = () => {
    refetch()
    if (isNotificationsOpen) {
      setUnreadCount(0);
      refetch?.();
    }
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    socket.connect();
    
    socket.on('connect', () => {
      socket.emit('joinUserRoom', userId);
    });

    const handleExamNotification = () => {
      setUnreadCount(prev => prev + 1);
      refetch?.();
    };

    socket.on('examNotification', handleExamNotification);

    return () => {
      socket.off('connect');
      socket.off('examNotification', handleExamNotification);
      socket.disconnect();
    };
  }, [userId, refetch]);

  const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <>
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-semibold cursor-pointer sm:ml-8" onClick={() => router.push("/dashboard")}>
          Dashboard
        </div>
        <div className="flex items-center space-x-6">
          {user.role=='teacher'?(
            <FaPlus className="text-xl cursor-pointer" title="Add" onClick={() => setIsDialogOpen(true)} />
          ):null}
          <div className="relative z-[1]">
            <span className="cursor-pointer" >
            <FaBell 
              className="text-xl cursor-pointer" 
              onClick={handleBellClick} 
            />
            </span>
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            {isNotificationsOpen && (
              <div className="absolute top-8 right-0 bg-gray-800 text-white text-sm rounded shadow-lg py-2 w-64 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 font-semibold border-b border-gray-700">
                  Notifications
                </div>
                {notifications.length === 0 ? (
                  <div className="px-4 py-2 text-gray-400">No notifications</div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      <div>{notification.message}</div>
                      <div className="text-xs text-gray-400">{timeAgo(notification.createdAt)}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <FaBars 
              className="text-xl cursor-pointer" 
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsNotificationsOpen(false);
              }} 
            />
            {isMenuOpen && (
              <div className="absolute top-8 right-0 bg-gray-800 text-white text-sm rounded shadow-lg py-2 w-32 z-[1]">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-700" onClick={() => setIsProfileOpen(true)}>
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-700" onClick={handleLogoutClick}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isProfileOpen && <UserProfileModal onClose={() => setIsProfileOpen(false)} />}
    </>
  );
};

export default Navbar;
