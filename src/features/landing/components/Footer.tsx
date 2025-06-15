
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-transparent py-12 mt-20 border-t border-white/10">
      <div className="container mx-auto px-6 text-center text-white/60 text-sm">
        <p>&copy; {new Date().getFullYear()} Medica. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            <span className="cursor-pointer hover:text-white transition-colors">Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
