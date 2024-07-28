"use client";

import React from "react";
import Slider from "../components/Slider";

const HomeContent = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Slider />
                <section className="container mx-auto px-4 py-12 text-center">
                    <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        若き天才、南杏佳が一つひとつが情熱と精密さを込めて作られた、唯一無二の芸術作品です。
                    </p>
                </section>
            </main>
        </div>
    );
};

export default HomeContent;
