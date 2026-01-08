import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Fingerprint,
  Smile,
  Wifi,
  Utensils,
  Shield,
  Lock,
  DoorOpen,
  ArrowLeftRight,
  Users,
  AlertTriangle,
  Briefcase,
  Scan,
  Building2,
  DoorClosed,
  Hotel,
} from "lucide-react";
import { getAllCategories } from "../data/productsDatabase";

const iconMap = {
  Fingerprint,
  Smile,
  Wifi,
  Utensils,
  Shield,
  Lock,
  DoorOpen,
  ArrowLeftRight,
  Users,
  AlertTriangle,
  Briefcase,
  Scan,
  Building2,
  DoorClosed,
  Hotel,
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const categories = getAllCategories();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("home")}
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Fingerprint className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">
              TST Technologies
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => navigate("home")}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/about")} // Navigate hook ka use button ke saath
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              About
            </button>

            {categories.map((category) => (
              <DropdownMenu
                key={category.id}
                title={category.name}
                items={category.productTypes}
                navigate={navigate}
                categoryId={category.id}
              />
            ))}

            <button
              onClick={() => navigate("contact")}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
            <button
              onClick={() => {
                navigate("home");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("about");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 font-medium"
            >
              About
            </button>
            <button
              onClick={() => {
                navigate("contact");
                setMobileMenuOpen(false);
              }}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium w-full"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const DropdownMenu = ({ title, items, navigate, categoryId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2">
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white min-w-[240px] rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {items.map((item) => {
            const IconComponent = iconMap[item.icon] || Fingerprint;
            return (
              <button
                key={item.id}
                onClick={() => navigate("product-list", categoryId, item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              >
                <IconComponent size={18} className="text-emerald-600" />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;
