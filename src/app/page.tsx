"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "../components/Slider"; // スライダーコンポーネントを追加

const Home = () => {
    return (
        <div>
            <Header />
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Welcome to Our Website
                </h1>
                <Slider />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
