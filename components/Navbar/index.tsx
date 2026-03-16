import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0  bg-white shadow-md ">
      <div className="flex items-center justify-between px-4 py-3 text-xl max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-3 ">
          <Image src="/favicon.ico" alt="" width={28} height={28} />
          <span className="font-bold text-xl ">Logo</span>
        </Link>
        <div className="space-x-12 font-medium ">
          <Link href="/">Home</Link>
          <Link href="/users">Users</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
