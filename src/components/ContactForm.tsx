"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppContext } from "../context/AppContext";

type Inputs = {
    name: string;
    email: string;
    message: string;
};

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    const { darkMode } = useAppContext();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label
                    htmlFor="name"
                    className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                    名前
                </label>
                <input
                    {...register("name", { required: "名前は必須です" })}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${
                        darkMode
                            ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                            : "bg-white text-gray-900 border-gray-300 focus:border-blue-500"
                    }`}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.name.message}
                    </p>
                )}
            </div>
            {/* 他のフィールドも同様に更新 */}
            <div>
                <button
                    type="submit"
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                        darkMode
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-500 hover:bg-blue-600"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                    送信
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
