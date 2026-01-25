"use client"; // required for hooks

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBriefcase, FaPlusCircle, FaUsers } from "react-icons/fa";
import {
  Menu,
  Briefcase,
  FileText,
  UserCircle,
  Users,
  LogOut,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const sidebarRef = useRef<HTMLDivElement | null>(null)

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });

      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (open && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.addEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const links = [
    { name: "My Jobs", href: "/employerDashboard", icon: Briefcase },
    {
      name: "Create Job",
      href: "/employerDashboard/create",
      icon: FileText,
    },
    {
      name: "Profile",
      href: "/employerDashboard/profile",
      icon: UserCircle,
    },
    {
      name: "Applicants",
      href: "/employerDashboard/applicants",
      icon: Users,
    },
  ];

  return (

    <div
      ref={sidebarRef}
      className={`
        bg-white border-r border-gray-200 shadow-md
        transition-all duration-300
        overflow-hidden
        flex flex-col
        my-8
        rounded-lg
        ${open ? "w-60" : "w-14"}
      `}
    >
      {/* Top Bar */}
      <div className="h-12 flex items-center px-2 border-b border-gray-200 shadow-md">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-gray-300 bg-gray-200"
        >
          {!open && <Menu size={20} />}
        </button>

        {open && (
          <span className="ml-3 font-semibold text-gray-700">Menu</span>
        )}
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-1 p-2 flex-1 mt-20">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`
                flex items-center gap-3 p-2 rounded
                hover:bg-blue-50 hover:text-[#5671b4]
                ${pathname === link.href
                  ? "bg-blue-100 text-[#3456ad]"
                  : "text-gray-700"
                }
              `}
            >
              <Icon size={18} />

              {open && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 border-t text-red-600 hover:bg-red-50"
      >
        <LogOut size={18} />
        {open && <span>Logout</span>}
      </button>
    </div>
  );
}
