"use client";

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* About Us section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            About Us
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Short description about your company. Add more
                            details here to give visitors a quick overview of
                            what you do.
                        </p>
                    </div>

                    {/* Quick Links section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Quick Links
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/news"
                                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                                >
                                    News
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products"
                                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Contact Us
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            Email:{" "}
                            <a
                                href="mailto:info@yourcompany.com"
                                className="hover:underline"
                            >
                                info@yourcompany.com
                            </a>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Phone:{" "}
                            <a
                                href="tel:+11234567890"
                                className="hover:underline"
                            >
                                (123) 456-7890
                            </a>
                        </p>
                    </div>
                </div>

                {/* Copyright section */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} Your Company Name. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
