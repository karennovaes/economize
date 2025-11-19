"use client";
import "./index.css"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 2. Importar os ícones "Brands" (FAB)
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
    // Define o estado para o ano
    const [currentYear, setCurrentYear] = useState('');
    // Hook useEffect para definir o ano APÓS a montagem no cliente
    useEffect(() => {
        // Isso garante que o código só rode no navegador, evitando erros de hidratação
        setCurrentYear(new Date().getFullYear().toString());
    }, []); // O array vazio [] significa que isso roda apenas uma vez (na montagem)
    return (
        <footer className='footer'>
            <p>
                &copy; {currentYear} Economize. Todos os direitos reservados.
            </p>
            <p >
                Um projeto de portfólio desenvolvido com Next.js, Prisma e muito café.
            </p>

            {/* Links de Redes Sociais (Exemplo) */}
            <div className='links'>
                <a href="https://github.com/karennovaes" title="GitHub"><FontAwesomeIcon icon={faGithub} style={{ width: '20px', height: '20px' }} />
          GitHub</a>
                <a href="https://www.linkedin.com/in/karen-novaes-domschke-3a2001369/" title="LinkedIn"><FontAwesomeIcon icon={faLinkedin} style={{ width: '20px', height: '20px' }} />
          LinkedIn</a>
            </div>
        </footer>
    )
}