"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/autoplay";

import "./ProductSlider.css";

// スライダーの画像の型定義
interface SliderImage {
    id: number;
    src: string;
    alt: string;
}

// コンポーネントのプロップス型定義
interface SliderProps {
    autoplaySpeed?: number;
    slidesGap?: number;
    imageQuality?: number;
}

const Slider: React.FC<SliderProps> = ({
    autoplaySpeed = 5000,
    slidesGap = 20,
    imageQuality = 75,
}) => {
    const [isClient, setIsClient] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // スライダーの設定
    const swiperConfig: SwiperOptions = {
        modules: [Autoplay],
        spaceBetween: slidesGap,
        slidesPerView: "auto",
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: autoplaySpeed,
        allowTouchMove: false,
        freeMode: {
            enabled: true,
            momentumRatio: 0.25,
            momentumVelocityRatio: 0.25,
        },
        watchSlidesProgress: true,
        grabCursor: false,
    };

    // スライダーの画像データ
    const sliderImages: SliderImage[] = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        src: `/images/photo${i + 1}.jpg`,
        alt: `製品 ${i + 1} の画像`,
    }));

    // 画像の読み込み状態を追跡
    const handleImageLoad = () => {
        setImagesLoaded((prev) => prev + 1);
    };

    // ローディング表示
    if (!isClient) {
        return (
            <div
                className="swiper-container flex justify-center items-center h-64 bg-gray-100 dark:bg-gray-800"
                role="region"
                aria-label="製品スライダー"
            >
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <span className="text-gray-500 dark:text-gray-400">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div
            className="swiper-container relative"
            role="region"
            aria-label="製品スライダー"
        >
            <Swiper {...swiperConfig}>
                {sliderImages.map((image) => (
                    <SwiperSlide key={image.id} className="swiper-slide-custom">
                        <div className="relative aspect-[4/3] w-full">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, 400px"
                                className="rounded-lg object-cover transition-opacity duration-300"
                                quality={imageQuality}
                                priority={image.id <= 2}
                                loading={image.id <= 2 ? "eager" : "lazy"}
                                onLoad={handleImageLoad}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/images/placeholder.jpg";
                                    target.classList.add("error-image");
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* 読み込み進捗表示 */}
            {imagesLoaded < sliderImages.length && (
                <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-800/50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            画像を読み込み中... ({imagesLoaded}/
                            {sliderImages.length})
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Slider;
