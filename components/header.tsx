import React from "react";
import Link from "next/link";
import DriveX from "./logo";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-0 flex justify-center items-center">
      <div className="backdrop-blur-md rounded-3xl max-w-md mx-4 mt-4">
        <div className="container mx-auto px-2 pt-4 flex justify-center items-center">
          <Link href="/" className="flex items-center">
            <DriveX />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
