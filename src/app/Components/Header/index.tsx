import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='px-12 py-4 flex items-center justify-between mx-auto'>
      <Link href={'/'} className='text-xl font-semibold hover:text-zinc-400 cursor-pointer'>Authentication</Link>
      <div className='flex items-center gap-x-6'>
        <Link href={'/'} className='hover:text-zinc-400 cursor-pointer'>Home</Link>
        <Link href={'/login'} className='hover:text-zinc-400 cursor-pointer'>Login</Link>
        <Link href={'/register'} className='border-2 border-amber-500 rounded-md px-4 py-1 hover:text-zinc-400 cursor-pointer'>Register</Link>
      </div>
    </header>
  )
}

export default Header