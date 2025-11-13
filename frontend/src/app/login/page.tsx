"use client"; // Necessário para 'useState' e 'onSubmit'
import React, { useState } from 'react';

import { useRouter } from 'next/navigation'; // 1. Importar o useRouter
import { useAuth } from '@/context/AuthContext'; // 2. Importar o hook de autenticação
import { loginUser, registerUser } from '@/api/authService'; // 3. Importar os serviços da API


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
    },
    errorMessage: {
        color: 'red',
        backgroundColor: '#ffe6e6',
        textAlign: 'center',
        padding: '10px',
        borderRadius: '8px',
        marginTop: '10px',
        fontSize: '14px',
    }
};



export default function LoginPage() {
    // --- Estados para o Formulário de Login ---
    const [loginEmail, setLoginEmail] = useState('');
    const [loginSenha, setLoginSenha] = useState('');
    const [loginError, setLoginError] = useState(''); // Estado para erros de login
    const [loginLoading, setLoginLoading] = useState(false); // Estado de loading

    // --- Estados para o Formulário de Cadastro ---
    const [cadastroNome, setCadastroNome] = useState('');
    const [cadastroEmail, setCadastroEmail] = useState('');
    const [cadastroSenha, setCadastroSenha] = useState('');
    const [cadastroError, setCadastroError] = useState(''); // Estado para erros de cadastro
    const [cadastroLoading, setCadastroLoading] = useState(false); // Estado de loading

    // 4. Inicializar os hooks
    const router = useRouter();
    const { login } = useAuth(); // Função 'login' do nosso AuthContext

    // Função para lidar com o envio (simulação por enquanto)
    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoginError(''); // Limpa erros antigos
        setLoginLoading(true); // Ativa o loading

        try {
            // 5. Chamar a API de login
            const { token, user } = await loginUser({ email: loginEmail, senha: loginSenha });

            // 6. Atualizar o contexto global
            login(token, user);

            // 7. Redirecionar para o Dashboard
            router.push('/dashboard'); // Redireciona para a página principal (Home/Dashboard)

        } catch (error: any) {
            // 8. Tratar erros vindos do backend (ex: "Credenciais inválidas")
            setLoginError(error.message || 'Erro ao tentar fazer login.');
        } finally {
            setLoginLoading(false); // Desativa o loading
        }


    };

    // Função para lidar com o envio de Cadastro (agora conectada ao backend)
    const handleSubmitCadastro = async (e: React.FormEvent) => {
        e.preventDefault();
        setCadastroError(''); // Limpa erros antigos
        setCadastroLoading(true); // Ativa o loading

        try {
            // 5. Chamar a API de cadastro
            await registerUser({ nome: cadastroNome, email: cadastroEmail, senha: cadastroSenha });

            // 6. Sucesso: Informar o utilizador e pedir para fazer login
            alert('Cadastro realizado com sucesso! Por favor, faça login.');

            // Limpa os campos de cadastro (opcional)
            setCadastroNome('');
            setCadastroEmail('');
            setCadastroSenha('');

        } catch (error: any) {
            // 8. Tratar erros vindos do backend (ex: "Email já em uso")
            setCadastroError(error.message || 'Erro ao tentar cadastrar.');
        } finally {
            setCadastroLoading(false); // Desativa o loading
        }
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
                    {/* Mostrar erro de login, se existir */}
                    {loginError && <p style={styles.errorMessage}>{loginError}</p>}
                    <button type="submit" style={styles.button} disabled={loginLoading}>
                        {loginLoading ? 'A entrar...' : 'Entrar'}
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
                    {/* Mostrar erro de cadastro, se existir */}
                    {cadastroError && <p style={styles.errorMessage}>{cadastroError}</p>}
                    <button type="submit" style={styles.button} disabled={cadastroLoading}>
                        {cadastroLoading ? 'A criar conta...' : 'Criar Conta'}
                    </button>
                </form>
            </div>
        </main>
    )
}