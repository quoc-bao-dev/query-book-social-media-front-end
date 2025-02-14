"use client";
import React, { PropsWithChildren, useState } from "react";
import SidebarQnA from "./partials/SidebarQnA";
import Header from "@/components/Layout/Header";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";

const Layout = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full max-w-[1200px] mx-auto relative">
      {/* Header */}
      <Header />

      {/* Section Title */}
      <div className="pt-20 pb-3 px-8 bg-background">
        <h1 className="text-3xl font-extrabold">Topic</h1>
        <h2 className="text-accent-foreground">
          Ask questions, get answers, and engage with the community
        </h2>
      </div>

      {/* Layout grid */}
      <div className="grid grid-cols-10 min-h-screen bg-background relative">
        {/* Sidebar */}
        <div
          className={`fixed mt-4 top-0 left-0 h-full bg-card z-50 shadow-lg transition-all duration-300 ease-in-out w-64 md:w-auto md:static md:col-span-3 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <SidebarQnA />

          {/* Button Toggle Sidebar */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`absolute top-20 ${
              isSidebarOpen ? "left-[250px]" : "-right-10"
            } text-primary-500 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-all z-50 md:hidden`}
          >
            {isSidebarOpen ? (
              <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
            ) : (
              <ChevronRightIcon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Nội dung chính */}
        <div className="col-span-10 md:col-span-7 p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
