import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./styles.css";
import Navbar from "@/components/Navbar/Public";
import Footer from "@/components/Rodape";
// 1. Importar o AuthProvider
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Economize",
  description: "Seu dinheiro, sob controle.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],

})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <AuthProvider>

          <main style={{ minHeight: 'calc(100vh - 150px)' }}> {/* Garante que o footer fica em baixo */}
            {children}
          </main>
          <Footer></Footer>
        </AuthProvider>

      </body>
    </html>
  );
}
