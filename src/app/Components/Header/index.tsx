import Link from 'next/link'
import React from 'react'
import { getSession } from "@/lib/getSession";
import { signOut } from "@/auth";
import Image from 'next/image';


const Header = async () => {
  const session = await getSession();
  const user = session?.user;
  const imageUrl = user?.image || "/avatar.png";

  return (
    <header className='px-12 py-4 flex items-center justify-between mx-auto'>
      <Link href={'/'} className='text-xl font-semibold hover:text-zinc-400 cursor-pointer'>Authentication</Link>
      <div className='flex items-center gap-x-6'>
        {!user ? (
          <>
            <Link href={'/'} className='hover:text-zinc-400 cursor-pointer'>Home</Link>
            <Link href={'/login'} className='hover:text-zinc-400 cursor-pointer'>Login</Link>
            <Link href={'/register'} className='border-2 border-amber-500 rounded-md px-4 py-1 hover:text-zinc-400 cursor-pointer'>Register</Link>
          </>
        ) : (
          <>
            <Link href={'/'} className='hover:text-zinc-400 cursor-pointer'>Home</Link>
            <Link href={'/dashboard'} className='hover:text-zinc-400 cursor-pointer'>DashBoard</Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit" className='hover:text-zinc-400 cursor-pointer'>
                Logout
              </button>
            </form>

            <div className='flex items-center gap-x-2'>
              <Image
                src={imageUrl}
                alt="アバターイメージ"
                height={35}
                width={35}
                className='rounded-full'
              />
              <div className='flex flex-col'>
                <div className='text-[12px]'>Welcom Back 👋</div>
                <div className='text-md font-semibold -mt-1'>{user.email}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header