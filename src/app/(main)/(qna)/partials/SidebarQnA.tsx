"use client";

import { Home, Bookmark, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarQnA() {
    const pathname = usePathname();

    return (
        <div className="bg-white h-full p-6 flex flex-col pt-10">
            <nav className="mt-6">
                <ul className="space-y-2">
                    {/* Option Q&A */}
                    <Link href="/qna"
                        className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all ${pathname === "/qna" ? "text-green-700 bg-[#DCFCE7] font-bold" : "text-gray-700 font-semibold hover:bg-gray-200"
                            }`}
                    >
                        <Home size={22} className={`${pathname === "/qna" ? "text-green-700" : "text-gray-700"}`} />
                        Q&A
                    </Link>

                    {/* Option My Question */}
                    <Link href="/myquestion"
                        className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all ${pathname === "/myquestion" ? "text-green-700 bg-[#DCFCE7] font-bold" : "text-gray-700 font-semibold hover:bg-gray-200"
                            }`}
                    >
                        <User size={22} className={`${pathname === "/myquestion" ? "text-green-700" : "text-gray-700"}`} />
                        My Question
                    </Link>

                    {/* Option My Save */}
                    <Link href="/mysave"
                        className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all ${pathname === "/mysave" ? "text-green-700 bg-[#DCFCE7] font-bold" : "text-gray-700 font-semibold hover:bg-gray-200"
                            }`}
                    >
                        <Bookmark size={22} className={`${pathname === "/mysave" ? "text-green-700" : "text-gray-700"}`} />
                        My Save
                    </Link>
                </ul>
            </nav>
        </div>
    );
}
