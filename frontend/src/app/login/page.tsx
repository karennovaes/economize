"use client"; // Necessário para 'useState' e 'onSubmit'
import React, { useState } from 'react';

//Aqui por fim de estudo, vou utilizar uma abordagem diferente para o css


// Estilos CSS Inline para o layout dividido
const styles: { [key: string]: React.CSSProperties } = {
    // Container principal que ocupa a tela inteira e divide
    pageContainer: {
        display: 'flex',
        minHeight: '100vh', // Garante que ocupe a altura toda
        fontFamily: 'Arial, sans-serif',
    },

    // Painel Esquerdo (Login)
    leftPanel: {
        flex: 1, // Ocupa 50%
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px 60px',
        backgroundColor: '#ffffff', // Fundo branco
    },

    // Painel Direito (Cadastro)
    rightPanel: {
        flex: 1, // Ocupa 50%
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px 60px',
        backgroundColor: '#f4f2fa', // Um tom de roxo bem claro
    },

    // Estilos do Formulário (reutilizados)
    title: {
        color: '#5a3dc8', // Sua cor roxa
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '2rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#5a3dc8', // Sua cor roxa
        color: 'white',
        padding: '15px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: '10px',
    },
    subtitle: {
        textAlign: 'center',
        color: '#555',
        marginBottom: '20px',
    },
  // Novo estilo para o link "Esqueci a senha"
    forgotPasswordLink: {
    color: '#5a3dc8', // Cor roxa
    fontSize: '14px',
    textAlign: 'right',
    textDecoration: 'none',
    cursor: 'pointer',
    marginBottom: '15px', // Espaço antes do botão de login
  }
};



export default function LoginPage() {
    // --- Estados para o Formulário de Login ---
    const [loginEmail, setLoginEmail] = useState('');
    const [loginSenha, setLoginSenha] = useState('');

    // --- Estados para o Formulário de Cadastro ---
    const [cadastroNome, setCadastroNome] = useState('');
    const [cadastroEmail, setCadastroEmail] = useState('');
    const [cadastroSenha, setCadastroSenha] = useState('');

    // Função para lidar com o envio (simulação por enquanto)
    const handleSubmitLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Próximo passo: conectar ao backend aqui
        console.log("Dados Login:", { loginEmail, loginSenha });
        alert('Simulação: Login enviado!');
    };

    // Função para lidar com o envio (simulação por enquanto)
    const handleSubmitCadastro = (e: React.FormEvent) => {
        e.preventDefault();
        // Próximo passo: conectar ao backend aqui
        console.log("Dados Cadastro:", { cadastroNome, cadastroEmail, cadastroSenha });
        alert('Simulação: Cadastro enviado!');
    };

    return (
        <main style={styles.pageContainer}>
            {/* --- PAINEL DA ESQUERDA (LOGIN) --- */}
            <div style={styles.leftPanel}>
                <h2 style={styles.title}>Login</h2>
                <p style={styles.subtitle}>Acesse sua conta para continuar.</p>

                <form onSubmit={handleSubmitLogin} style={styles.form}>

                    <div style={styles.formGroup}>
                        <label htmlFor="loginEmail" style={styles.label}>E-mail</label>
                        <input
                            type="email"
                            id="loginEmail"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="loginSenha" style={styles.label}>Senha</label>
                        <input
                            type="password"
                            id="loginSenha"
                            value={loginSenha}
                            onChange={(e) => setLoginSenha(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                        {/* --- Link "Esqueci a senha" Adicionado --- */}
                        <a href="#" style={styles.forgotPasswordLink}>
                            Esqueci a senha
                        </a>
                    <button type="submit" style={styles.button}>
                        Entrar
                    </button>
                </form>
            </div>

            {/* --- PAINEL DA DIREITA (CADASTRO) --- */}
            <div style={styles.rightPanel}>
                <h2 style={styles.title}>Cadastro</h2>
                <p style={styles.subtitle}>Novo por aqui? Crie sua conta.</p>

                <form onSubmit={handleSubmitCadastro} style={styles.form}>

                    <div style={styles.formGroup}>
                        <label htmlFor="cadastroNome" style={styles.label}>Nome</label>
                        <input
                            type="text"
                            id="cadastroNome"
                            value={cadastroNome}
                            onChange={(e) => setCadastroNome(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="cadastroEmail" style={styles.label}>E-mail</label>
                        <input
                            type="email"
                            id="cadastroEmail"
                            value={cadastroEmail}
                            onChange={(e) => setCadastroEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label htmlFor="cadastroSenha" style={styles.label}>Senha</label>
                        <input
                            type="password"
                            id="cadastroSenha"
                            value={cadastroSenha}
                            onChange={(e) => setCadastroSenha(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" style={styles.button}>
                        Criar Conta
                    </button>
                </form>
            </div>
        </main>
    )
}