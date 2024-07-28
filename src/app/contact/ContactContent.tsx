"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string;
    email: string;
    message: string;
};

const ContactContent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // ここで実際のフォーム送信処理を行います（例：APIエンドポイントへのPOSTリクエスト）
        console.log(data);

        // 送信成功を想定
        setIsSubmitted(true);
        reset();
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">お問い合わせ</h1>

            {isSubmitted ? (
                <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6"
                    role="alert"
                >
                    <strong className="font-bold">送信完了!</strong>
                    <span className="block sm:inline">
                        {" "}
                        お問い合わせありがとうございます。早急にご返信いたします。
                    </span>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            お名前
                        </label>
                        <input
                            {...register("name", {
                                required: "お名前は必須です",
                            })}
                            id="name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            メールアドレス
                        </label>
                        <input
                            {...register("email", {
                                required: "メールアドレスは必須です",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        "有効なメールアドレスを入力してください",
                                },
                            })}
                            id="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700"
                        >
                            メッセージ
                        </label>
                        <textarea
                            {...register("message", {
                                required: "メッセージは必須です",
                            })}
                            id="message"
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        ></textarea>
                        {errors.message && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.message.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            送信
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ContactContent;
