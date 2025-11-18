"use client";

import Link from 'next/link';
import Image from 'next/image'
import NavItem, { NavItemInterface } from "../../NavItem";
import "./index.css"
import { usePathname } from 'next/navigation';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { useState } from 'react';

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
    const [openMenu, setOpenMenu] = useState<boolean>(false);

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
                <ul className={`nav-items ${openMenu ? 'open' : ''}`}>
                    {itens.map((item, index)=>(
                        <NavItem
                            key={index}
                            url={item.url}
                            label={item.label}
                            isActive={pathname === item.url}
                        />
                    ))}
                </ul>
            <button  className="btn-mobile" onClick={() => setOpenMenu(!openMenu)}>
                {openMenu ? <FaXmark /> : <FaBars />}
            </button >
            <Link href="/login">
            <button className='btn-default'>
                Entrar
            </button>
            </Link>

            

            </nav>
        </header>
    )
}