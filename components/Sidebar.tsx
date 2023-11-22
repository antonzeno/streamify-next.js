"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

const Sidebar = ({ children, songs }: SidebarProps) => {
    const pathname = usePathname();
    const routes = useMemo(
        () => [
            {
                icon: FaHome,
                label: "Home",
                active: pathname !== "/search",
                href: "/",
            },
            {
                icon: FaSearch,
                label: "Search",
                active: pathname === "/search",
                href: "/search",
            },
        ],
        [pathname]
    );
    return (
        <div className="flex h-full">
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((route) => (
                            <SidebarItem key={route.label} {...route} />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
        </div>
    );
};

export default Sidebar;
