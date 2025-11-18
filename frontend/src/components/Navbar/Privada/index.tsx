"use client";

import Link from 'next/link';
import Image from 'next/image'
import NavItem, { NavItemInterface } from "../../NavItem";
import "./index.css"
import { usePathname, useRouter } from 'next/navigation';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {


    const { user, logout } = useAuth();
    const router = useRouter();

    // 2. Estado para controlar o dropdown
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/login'); // Redireciona para o login após sair
    };

    // 3. Função para obter as iniciais do nome
    const getInitials = (name: string | undefined): string => {
        if (!name) return '?';
        const names = name.split(' ');
        const firstName = names[0]?.[0] || '';
        const lastName = names.length > 1 ? names[names.length - 1]?.[0] : '';
        return (firstName + lastName).toUpperCase();
    };

    return (
        <header>
            <nav className="navbar">
                <Link href="/dashboard" className='logo'>
                    <Image
                        src="logo.svg"
                        width={50}
                        height={50}
                        alt="Logo do sistema" />
                </Link>

                {/* 4. Novo Menu do Utilizador (Avatar e Dropdown) */}
                <div className="userMenuContainer">
                    <button
                        className="avatarButton"
                        onClick={() => setIsMenuOpen(!isMenuOpen)} // Ativa/Desativa o menu
                    >
                        {getInitials(user?.nome)}
                        <span className="arrowDown">&#9660;</span> {/* Seta para baixo */}
                    </button>

                    {/* 5. Menu Dropdown (Condicional) */}
                    {isMenuOpen && (
                        <div className="dropdownMenu">
                            <Link href="/perfil" className="dropdownLink">
                                Editar Cadastro
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="dropdownLink logoutButton">
                                Sair
                            </button>
                        </div>
                    )}
                </div>

            </nav>



        </header >
    )
}