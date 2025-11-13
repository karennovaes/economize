"use client";

// 1. Importar os módulos principais do Swiper (Core)
// Navigation e Pagination são módulos que controlam as setas e os pontos
import { Navigation, Pagination, A11y } from 'swiper/modules';

// 2. Importar os componentes React do Swiper
import { Swiper, SwiperProps } from 'swiper/react';

// 3. Importar os estilos CSS principais do Swiper
import 'swiper/css';
// Importar os estilos específicos para Navigation (setas) e Pagination (pontos)
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import { ReactNode } from 'react';

import "./Slider.css"


interface SliderProps{
    settings: SwiperProps
    children: ReactNode
}

export default function Slider({ settings, children}: SliderProps) {
    return (
        <Swiper 
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false
            }}
            modules={[Navigation, Pagination, A11y]} 
            
    
            {...settings}
        
        >
            {children}
        </Swiper>
    )
}