import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Globe2 } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Globe2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-teal-500 bg-clip-text text-transparent">
              DNSPulse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" currentPath={location.pathname}>
              Home
            </NavLink>
            <NavLink to="/about" currentPath={location.pathname}>
              About
            </NavLink>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink to="/" currentPath={location.pathname} onClick={closeMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/about" currentPath={location.pathname} onClick={closeMenu}>
                About
              </MobileNavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

type NavLinkProps = {
  to: string;
  currentPath: string;
  children: React.ReactNode;
};

const NavLink = ({ to, currentPath, children }: NavLinkProps) => {
  const isActive = to === '/' ? currentPath === '/' : currentPath.startsWith(to);

  return (
    <Link
      to={to}
      className={`font-medium transition-colors ${
        isActive
          ? 'text-blue-600 hover:text-blue-700'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {children}
    </Link>
  );
};

type MobileNavLinkProps = NavLinkProps & {
  onClick: () => void;
};

const MobileNavLink = ({ to, currentPath, onClick, children }: MobileNavLinkProps) => {
  const isActive = to === '/' ? currentPath === '/' : currentPath.startsWith(to);

  return (
    <Link
      to={to}
      className={`p-2 rounded-md font-medium ${
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;