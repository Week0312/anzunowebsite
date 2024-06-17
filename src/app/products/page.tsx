"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Products = () => {
    return (
        <div>
            <Header />
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">商品ページ</h1>
                <div className="space-y-4">
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-semibold">商品1</h2>
                        <p>商品の説明がここに表示されます。</p>
                    </div>
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-semibold">商品2</h2>
                        <p>商品の説明がここに表示されます。</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Products;
