"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const News = () => {
    return (
        <div>
            <Header />
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">お知らせ</h1>
                <div className="space-y-4">
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-semibold">お知らせ1</h2>
                        <p>お知らせの内容がここに表示されます。</p>
                    </div>
                    <div className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-semibold">お知らせ2</h2>
                        <p>お知らせの内容がここに表示されます。</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default News;
