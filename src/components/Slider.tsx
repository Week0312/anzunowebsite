"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <img src="/images/product1.jpg" alt="Product 1" />
                </div>
                <div>
                    <img src="/images/product2.jpg" alt="Product 2" />
                </div>
                <div>
                    <img src="/images/product3.jpg" alt="Product 3" />
                </div>
            </Slider>
        </div>
    );
};

export default ProductSlider;
