import Link from 'next/link'
import React from 'react'
import { getSession } from "@/lib/getSession";
import { signOut } from "@/auth";

const Header = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <header className='px-12 py-4 flex items-center justify-between mx-auto'>
      <Link href={'/'} className='text-xl font-semibold hover:text-zinc-400 cursor-pointer'>Authentication</Link>
      <div className='flex items-center gap-x-6'>
        <Link href={'/'} className='hover:text-zinc-400 cursor-pointer'>Home</Link>
        {!user ? (
          <>
            <Link href={'/login'} className='hover:text-zinc-400 cursor-pointer'>Login</Link>
            <Link href={'/register'} className='border-2 border-amber-500 rounded-md px-4 py-1 hover:text-zinc-400 cursor-pointer'>Register</Link>
          </>
        ) : (
          <>
            <Link href={'/dashboard'} className='hover:text-zinc-400 cursor-pointer'>DashBoard</Link>
            <Link href={'/'} className='border-2 border-amber-500 rounded-md px-4 py-1 hover:text-zinc-400 cursor-pointer'>Logout</Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit" className='border-2 border-amber-500 rounded-md px-4 py-1 hover:text-zinc-400 cursor-pointer'>
                Logout
              </button>
            </form>
          </>
        )}
      </div>
    </header>
  )
}

export default Header