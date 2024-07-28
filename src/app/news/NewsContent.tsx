"use client";

import React from "react";

const newsItems = [
    {
        id: 1,
        title: "新コレクション発売",
        date: "2024年3月15日",
        summary:
            "2024年春の新コレクションが登場。鮮やかな色彩と革新的なデザインをお楽しみください。",
        content:
            "詳細な記事内容がここに入ります。新コレクションの特徴や開発背景などについて詳しく説明します。",
    },
    {
        id: 2,
        title: "職人紹介：マスター陶芸家インタビュー",
        date: "2024年2月28日",
        summary:
            "当社の人気作品を生み出す熟練陶芸家へのインタビューをお届けします。",
        content:
            "陶芸家の経歴、技術、作品に対する思いなどを詳しく紹介する記事内容がここに入ります。",
    },
    {
        id: 3,
        title: "サステナビリティへの取り組み発表",
        date: "2024年2月10日",
        summary:
            "環境に配慮した新しい包装材と持続可能な生産方法について詳しくご紹介します。",
        content:
            "具体的な環境への取り組み、導入された新技術、今後の目標などを詳細に説明する記事内容がここに入ります。",
    },
];

const NewsContent = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                最新ニュース
            </h1>
            <div className="space-y-6">
                {newsItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {item.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {item.date}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {item.summary}
                        </p>
                        <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                            詳細を見る
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsContent;
