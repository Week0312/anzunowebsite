"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";

// スタイルのインポートを1箇所にまとめる
import "swiper/css";
import "swiper/css/autoplay";

// このインポートが必要かどうか確認してください。必要なければ削除してください。
import "./ProductSlider.css";

interface SliderProps {
    // 必要に応じてpropsの型を定義
}

const Slider: React.FC<SliderProps> = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        const handleResize = () => {
            if (swiperRef.current) {
                swiperRef.current.update();
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="swiper-container" aria-label="製品スライダー">
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                modules={[Autoplay]}
                spaceBetween={10}
                loop={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
                speed={8000}
                allowTouchMove={false}
                slidesPerView="auto"
                freeMode={{
                    enabled: true,
                    momentumBounce: false,
                }}
                watchSlidesProgress={true}
                grabCursor={false}
                cssMode={false}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SwiperSlide key={num} style={{ width: "auto" }}>
                        <Image
                            src={`/images/photo${num}.jpg`}
                            alt={`製品 ${num} の画像`}
                            width={300}
                            height={200}
                            className="slider-image"
                            priority={num <= 4}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
