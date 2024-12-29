import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="w-full min-h-[80vh] bg-purple-100 flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-6xl font-bold font-[Flow Circular] mb-6 leading-tight">
            Shop the Future,
            <br />
            <span className="text-purple-600">Today.</span>
          </h1>
          <p className="text-xl mb-8 text-gray-700">
            Discover our curated collection of innovative products that blend style with functionality.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-fit px-8 py-4 bg-black text-white font-bold text-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(147,51,234,1)] transition-all hover:shadow-[4px_4px_0px_0px_rgba(147,51,234,1)]"
          >
            Explore Collection
          </motion.button>
        </motion.div>

        {/* Image/Visual Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-[500px] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <Image
            src="/api/placeholder/600/500"
            alt="Hero Image"
            className="w-full h-full object-cover"
            width={600}
            height={500}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;