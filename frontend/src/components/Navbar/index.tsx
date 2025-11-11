"use client";

import Link from 'next/link';
import Image from 'next/image'
import NavItem, { NavItemInterface } from '../NavItem';
import "./index.css"
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const itens: NavItemInterface[] = [
        {
            url: "/",
            label: "Como funciona"

        },
        {
            url: "/contato",
            label: "Entre em contato"

        }
        
        
    ]


    const pathname = usePathname();

    return (
        <header>
            <nav className="navbar">
                <Link href="/" className='logo'>
                    <Image 
                    src="logo.svg" 
                    width={50} 
                    height={50} 
                    alt="Logo do sistema"/>
                </Link>
                <ul className='nav-items'>
                    {itens.map((item, index)=>(
                        <NavItem
                            key={index}
                            url={item.url}
                            label={item.label}
                            isActive={pathname === item.url}
                        />
                    ))}
                </ul>

            <button className='btn-default'>
                Entrar
            </button>
            

            </nav>
        </header>
    )
}