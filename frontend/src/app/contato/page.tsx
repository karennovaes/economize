"use client"; // Necessário para usar 'useState' no formulário
import React, { useState } from 'react';
import "./index.css"
import Navbar from '@/components/Navbar/Public';


export default function Contato() {
    // Estados para controlar os campos do formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [status, setStatus] = useState(''); // Mensagem de sucesso

    // Função para lidar com o envio (simulação)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Impede o recarregamento da página

        // (Aqui  adicionaria a lógica para enviar o e-mail)

        // Simulação de sucesso
        console.log("Formulário enviado:", { nome, email, mensagem });
        setStatus('Mensagem enviada com sucesso! (Simulação)');

        // Limpa o formulário
        setNome('');
        setEmail('');
        setMensagem('');
    };



    return (
        <main className='container'>
            <Navbar></Navbar>
            <h2 className='title'>Entre em Contato</h2>
            <p style={{ textAlign: 'center', marginBottom: '20px', color: '#555' }}>
                Tem alguma dúvida ou sugestão? Mande uma mensagem para nós.
            </p>

            <form onSubmit={handleSubmit} className='form'>

                <div className="formGroup">
                    <label htmlFor="nome" className="label">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="input"
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="email" className="label">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                        required
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="mensagem" className="label">Mensagem</label>
                    <textarea
                        id="mensagem"
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        className="textarea"
                        rows={6}
                        required
                    />
                </div>

                <button type="submit" className="button">
                    Enviar Mensagem
                </button>

                {status && <p className="statusMessage">{status}</p>}
            </form>


        </main>
    )
}