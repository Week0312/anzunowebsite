"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Contact = () => {
    return (
        <div>
            <Header />
            <main className="p-4">
                <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            名前
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            メール
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            メッセージ
                        </label>
                        <textarea
                            name="message"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            rows="4"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            送信
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
