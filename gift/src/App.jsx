import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OpenWhen from "./pages/OpenWhen";
import Letter from "./pages/Letter";
import TimeTogether from "./pages/TimeTogether";
import VirtualHug from "./pages/VirtualHug";

/* 👇 This component is INSIDE BrowserRouter */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/open-when" element={<OpenWhen />} />
        <Route path="/open-when/:scenario" element={<Letter />} />
        <Route path="/time-together" element={<TimeTogether />} />
        <Route path="/virtual-hug" element={<VirtualHug />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
