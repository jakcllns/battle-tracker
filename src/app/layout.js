'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Battle Tracker',
  
}

export default function RootLayout({ children }) {
  const pathName = usePathname()
  const paths = [
    {
      path: '/',
      name: 'Battle Tracker'

    },
    {
      path: '/new-creature',
      name: 'Create New Monster'
    }
  ]

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='lg:float-left sm:block lg:pt-8 px-3'>
          <ul className='sm:inline'>
            {
              paths.map(({path, name},i) => {
                return (
                  <li disabled={path === pathName} key={i} className={`font-bold lg:block lg:mx-0 sm:inline sm:mx-1 ${path === pathName ? 'underline text-gray-500': ''}`}><Link href={path}>{name}</Link></li>
                )
              })
            }
          </ul>
        </div>
        {children}
        </body>
    </html>
  )
}
