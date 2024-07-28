const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            About Us
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Short description about your company.
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Quick Links
                        </h2>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/news"
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                >
                                    News
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/products"
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                >
                                    Products
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Contact Us
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Email: info@yourcompany.com
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            Phone: (123) 456-7890
                        </p>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        &copy; 2024 Your Company Name. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
