"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // icons for mobile

const ChapterNavbar = ({ ColorScheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToComponent = (id) => {
    const component = document.getElementById(id);
    if (component) {
      component.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // close menu on click
    }
  };

  const links = [
    { label: "About Us", id: "about" },
    { label: "Events", id: "events" },
    { label: "Membership", id: "membership" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      {ColorScheme && (
        <nav
          className="fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-md"
          style={{ background: ColorScheme.CommonComponentBG }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
            {/* Back Button */}
            <a
              onClick={() => console.log("Don't forget to link the back button")}
              className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200"
              style={{
                color: ColorScheme.PrimaryTextColor,
                background: ColorScheme.NavBarButtonBG,
              }}
            >
              Back
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-3">
              {links.map((link) => (
                <a
                  key={link.id}
                  onClick={() => scrollToComponent(link.id)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{
                    color: ColorScheme.PrimaryTextColor,
                    background: ColorScheme.NavBarButtonBG,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      ColorScheme.NavBarButtonBGHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      ColorScheme.NavBarButtonBG)
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{
                color: ColorScheme.PrimaryTextColor,
                background: ColorScheme.NavBarButtonBG,
              }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Links */}
          {isOpen && (
            <div className="md:hidden flex flex-col space-y-2 px-4 pb-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  onClick={() => scrollToComponent(link.id)}
                  className="px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{
                    color: ColorScheme.PrimaryTextColor,
                    background: ColorScheme.NavBarButtonBG,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      ColorScheme.NavBarButtonBGHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      ColorScheme.NavBarButtonBG)
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default ChapterNavbar;
