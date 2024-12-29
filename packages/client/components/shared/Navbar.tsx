import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, UserCircle } from 'lucide-react';
import Link from 'next/link';

const Navbar = ({ isAuthenticated = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="w-full px-6 py-4 bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold font-[Flow Circular]"
          >
            BRAND
          </motion.div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
              0
            </span>
          </motion.div>

          {/* User Icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer"
          >
            <UserCircle size={24} />
          </motion.div>

          {/* Auth Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-2 font-bold ${
              isAuthenticated 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-yellow-400 hover:bg-yellow-500'
            } border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black`}
          >
            {isAuthenticated ? 'Log out' : 'Get Started'}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;