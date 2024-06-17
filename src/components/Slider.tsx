"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductSlider.css"; // スタイルシートをインポート

const ProductSlider = () => {
    const settings = {
        dots: false, // ドットナビゲーションを無効にする
        infinite: true,
        speed: 8000, // スライドの速度をゆっくりに設定
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0, // スライドの切り替えを連続で行うために0に設定
        cssEase: "linear", // 遷移効果をスムーズにする
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <img
                        src="/images/photo1.jpg"
                        alt="Product 1"
                        className="slider-image"
                    />
                </div>
                <div>
                    <img
                        src="/images/photo2.jpg"
                        alt="Product 2"
                        className="slider-image"
                    />
                </div>
                <div>
                    <img
                        src="/images/photo3.jpg"
                        alt="Product 3"
                        className="slider-image"
                    />
                </div>
                <div>
                    <img
                        src="/images/photo4.jpg"
                        alt="Product 4"
                        className="slider-image"
                    />
                </div>
                <div>
                    <img
                        src="/images/photo5.jpg"
                        alt="Product 5"
                        className="slider-image"
                    />
                </div>
                <div>
                    <img
                        src="/images/photo6.jpg"
                        alt="Product 6"
                        className="slider-image"
                    />
                </div>
                <div>
                    <img
                        src="/images/photo7.jpg"
                        alt="Product 7"
                        className="slider-image"
                    />
                </div>
                <div>
                    <img
                        src="/images/photo8.jpg"
                        alt="Product 8"
                        className="slider-image"
                    />
                </div>
                <div>
                    <img
                        src="/images/photo9.jpg"
                        alt="Product 9"
                        className="slider-image"
                    />
                </div>
                <div>
                    <img
                        src="/images/photo10.jpg"
                        alt="Product 10"
                        className="slider-image"
                    />
                </div>
            </Slider>
        </div>
    );
};

export default ProductSlider;
