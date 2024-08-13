"use client"

import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {

  const { data: session } = useSession();

  return (
    <nav className='flex justify-between items-center w-full pt-6'>
      <Link href="/" className=''>
        <p>Geetansh R</p>
      </Link>


      {/* for Desktop */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <button
              type="button"
              onClick={signOut}
              className=''
            >Sign Out</button>
            <Link href="profile">Profile</Link>
          </div>
        ) : (
          <div className='flex gap-3 md:gap-5'>
            <button
              type="button"
              onClick={signIn}
              className=''
            >Login</button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
