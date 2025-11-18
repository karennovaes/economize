"use client";
import { Slider, SliderProps, Slide } from '@/components/Slider/';
import React from 'react';

import Image from 'next/image'
import Footer from '@/components/Rodape';
import Navbar from '@/components/Navbar/Public';

export default function Home() {
  const settings: SliderProps = {
    spaceBetween: 50,
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },

  };
  return (
    // 1. Wrapper principal (use <main> para conteúdo principal)
    // Demos um padding geral para a página.
    <main>
      <Navbar></Navbar>
      {/* 2. Div do Slider (com 40% da largura e centralizada) */}
      <div className="Slider">
        <Slider settings={settings} >
          <Slide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '400px' }}>
            <Image src="/1.png" fill={true} style={{ objectFit: 'cover' }} alt="" />
          </Slide>
          <Slide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '400px' }}>
            <Image src="/2.png" fill={true} style={{ objectFit: 'cover' }} alt="" />
          </Slide>
          <Slide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '400px' }}>
            <Image src="/3.png" fill={true} style={{ objectFit: 'cover' }} alt="" />
          </Slide>
        </Slider>
      </div>
      <section style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid #eee' // Linha separadora
      }}>
        <h2 style={{ color: '#5a3dc8' }} >Sobre o Economize</h2>
        <p style={{ maxWidth: '600px', margin: 'auto', color: '#555' }}>
          Economize é a sua nova plataforma de gerenciamento financeiro.
          Controle seus gastos, crie orçamentos e veja seu dinheiro crescer.
        </p>
      </section>

      {/* Exemplo de layout de 2 colunas */}
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        padding: '40px 20px'
      }}>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', width: '300px' }}>
          <h3 style={{ color: '#5a3dc8' }}>Controle Total</h3>
          <p>Registre todas as suas transações de forma rápida e intuitiva.</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', width: '300px' }}>
          <h3 style={{ color: '#5a3dc8' }}>Relatórios Visuais</h3>
          <p>Veja gráficos interativos do seu progresso financeiro.</p>
        </div>
      </section>
    </main> // 1. Fechamento do wrapper principal

  );
}
