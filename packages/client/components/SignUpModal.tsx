import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<SignUpData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSignUp = async () => {
    // Implement Google OAuth logic here
    toast.info("Google sign up coming soon!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success('Account created successfully!');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative max-w-md w-full mx-4"
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 hover:scale-110 transition-transform"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Create your account</h2>
        
        <Button
          onClick={handleGoogleSignUp}
          variant="outline"
          className="w-full mb-4 flex items-center justify-center gap-2 border-2 border-black bg-red-500 hover:bg-gray-50"
        >
          <FaGoogle className="text-white" width={24}/>
          <p className='text-white'>Continue with Google</p>
        </Button>

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
            or
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Name</label>
            <Input 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-2 border-black rounded"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <Input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-2 border-black rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <Input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-2 border-black rounded"
              placeholder="Create a password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Confirm Password</label>
            <Input 
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-2 border-black rounded"
              placeholder="Confirm your password"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            disabled={isLoading}
            className="w-full px-6 py-2 bg-yellow-400 text-black font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUpModal;
