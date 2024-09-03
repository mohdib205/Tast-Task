import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomBar from "./BottomBar";


function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-28">
        <Header />
      </div>
      <main className="flex-1 bg-gray-100">
        <Outlet />
      </main>
      <div className="h-16">
        <BottomBar />
      </div>
    </div>
  );
}

export default Layout;
