"use client";
import { Slider, SliderProps, Slide } from '@/components/Slider/';
import React from 'react';

import Image from 'next/image'
import slide1 from "../../public/1.png"
import slide2 from "../../public/2.png"
import slide3 from "../../public/3.png"






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
    <Slide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image src={slide1} style={{ width: '100%' }} alt="" />
    </Slide>
    <Slide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image src={slide2} style={{ width: '100%' }} alt="" />
    </Slide>
    <Slide style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image src={slide3} style={{ width: '100%' }} alt="" />
    </Slide>
  </Slider>
</div>
);
}
