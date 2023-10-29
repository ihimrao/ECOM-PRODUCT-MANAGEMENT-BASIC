import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 p-4 text-white sticky bottom-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <p>
          &copy; {new Date().getFullYear()} ECOM. All rights reserved.
        </p>
        <div>
          <a href="/privacy-policy" className="mr-4">
            Privacy Policy
          </a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
