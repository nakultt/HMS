"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sticky top-0 z-40 w-full border-b-4 border-black bg-white"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center size-10 bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <Zap className="size-5 text-black" strokeWidth={3} />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-black uppercase tracking-tighter text-black leading-none">
              Hack·Track
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
              Management System
            </span>
          </div>
        </Link>

      </div>
    </motion.nav>
  );
}
