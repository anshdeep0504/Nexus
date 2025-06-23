"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShow(currentScroll < scrollY || currentScroll < 10);
      setScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <AnimatePresence>
      {show && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="sticky top-0 w-full h-24 bg-background/80 backdrop-blur-lg z-50 shadow-md"
        >
          <Wrapper className="h-full px-6">
            <div className="flex items-center justify-between h-full py-3">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-3">
                  <Icons.icon className="w-8 h-8" />
                  <span className="text-3xl font-extrabold hidden lg:block text-foreground">
                    Nexus
                  </span>
                </Link>
              </div>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-10">
                <ul className="flex items-center gap-10">
                  {NAV_LINKS.map((link, index) => (
                    <li key={index} className="text-lg font-bold link hover:text-red-500 transition-all duration-200">
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button + Mobile */}
              <div className="flex items-center gap-4">
                <Link href="#" className="hidden lg:block">
                  <Button variant="red" size="lg" className="px-6 py-2.5 text-lg font-bold">
                    Get Started
                  </Button>
                </Link>
                <MobileMenu />
              </div>
            </div>
          </Wrapper>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
