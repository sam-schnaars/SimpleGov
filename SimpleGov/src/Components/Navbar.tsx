import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Check if a path is active
const isActive = (path: string): boolean => {
    return location.pathname === path;
};

  return (
    <nav className="mt-2">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center space-x-1">
            <Link to="/" className="flex items-center">
        <div className="mb-6">
          <h1 className="text-6xl font-extrabold tracking-tight mb-2">
            <span className="text-purple-500">Simple</span>
            <span className="text-purple-700">GOV</span>
          </h1>
        </div>
            </Link>
          <NavLink to="/" isActive={isActive('/')}>
            Home
          </NavLink>
          <NavLink to="/analysis" isActive={isActive('/analysis')}>
            Analysis
          </NavLink>
          <NavLink to="/about" isActive={isActive('/about')}>
            About
          </NavLink>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="#" className="text-purple-200 hover:text-white text-sm">Sign In</a>
          <button className="bg-white text-purple-600 hover:bg-purple-100 px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-150">
            Try Premium
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
          
          <button className="bg-white text-purple-600 hover:bg-purple-100 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150">
            Premium
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="mt-2 bg-purple-800 rounded-md p-2 shadow-lg">
            <NavLink to="/" isActive={isActive('/')} mobile>
              Home
            </NavLink>
            <NavLink to="/analysis" isActive={isActive('/analysis')} mobile>
              Analysis
            </NavLink>
            <NavLink to="/about" isActive={isActive('/about')} mobile>
              About
            </NavLink>
            <div className="border-t border-purple-700 my-2 pt-2">
              <a href="#" className="block py-2 px-3 text-purple-200 hover:text-white rounded-md">
                Sign In
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// NavLink component for consistent styling

interface NavLinkProps {
  to: string;
  children: ReactNode;
  isActive: boolean;
  mobile?: boolean;
}

const NavLink = ({ to, children, isActive, mobile = false }: NavLinkProps) => {
  const baseClasses = "font-medium transition-colors duration-150";
  const mobileClasses = mobile 
    ? "block py-2 px-3 text-sm rounded-md" 
    : "px-3 py-2 rounded-md text-sm";
  
  const activeClasses = isActive 
    ? "bg-purple-800 text-white" 
    : "text-purple-200 hover:text-white hover:bg-purple-800/50";
  
  return (
    <Link to={to} className={`${baseClasses} ${mobileClasses} ${activeClasses}`}>
      {children}
    </Link>
  );
};

export default Navbar;