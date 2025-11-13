"use client";
import { Slider, SliderProps, Slide } from '@/components/Slider/';
import React from 'react';

import Image from 'next/image'

export default function Home() {
  const settings: SliderProps = {
    spaceBetween: 50,
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },

  };
return (
  
<div className="Slider">
    <Slider settings={settings} >
      <Slide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , position: 'relative', height: '400px'}}>
        <Image src="/1.png" fill={true} style={{ objectFit: 'cover' }} alt="" />
      </Slide>
      <Slide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  position: 'relative', height: '400px' }}>
        <Image src="/2.png" fill={true} style={{ objectFit: 'cover' }} alt="" />
      </Slide>
      <Slide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  position: 'relative', height: '400px' }}>
        <Image src="/3.png" fill={true} style={{ objectFit: 'cover' }} alt="" />
      </Slide>
    </Slider>
</div>
  
);
}
