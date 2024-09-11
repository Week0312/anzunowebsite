"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

import "./ProductSlider.css";

interface SliderProps {
    // 必要に応じてpropsの型を定義
}

const Slider: React.FC<SliderProps> = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsClient(true);
        }
    }, []);

    const swiperConfig = {
        modules: [Autoplay],
        spaceBetween: 20,
        slidesPerView: "auto",
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 5000,
        allowTouchMove: false,
        freeMode: {
            enabled: true,
            momentumRatio: 0.25,
            momentumVelocityRatio: 0.25,
        },
        watchSlidesProgress: true,
        grabCursor: false,
    };

    if (!isClient) {
        return (
            <div className="swiper-container" aria-label="製品スライダー">
                Loading...
            </div>
        );
    }

    return (
        <div className="swiper-container" aria-label="製品スライダー">
            <Swiper {...swiperConfig}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SwiperSlide key={num}>
                        <div className="relative w-full pt-[75%]">
                            <Image
                                src={`/images/photo${num}.jpg`}
                                alt={`製品 ${num} の画像`}
                                layout="fill"
                                objectFit="cover"
                                className="slider-image rounded-lg"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
