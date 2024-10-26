import Image from "next/image";
import Link from "next/link";
import Slider from "../components/Slider";
import { getNewArrivals } from "@/lib/products";

export default async function HomePage() {
    const newArrivals = await getNewArrivals();

    return (
        <div className="flex flex-col space-y-12 pb-16">
            <Slider />

            <section className="container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
                    唯一無二の手作り陶器
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center">
                    50年以上の経験を持つ当社が、最高級の手作り陶器をお届けします。
                    一つひとつが情熱と精密さを込めて作られた、世界に一点だけの芸術作品です。
                </p>
            </section>

            <section className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                    新着作品
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {newArrivals.map((product, index) => (
                        <div
                            key={product.id}
                            className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden"
                        >
                            <div className="relative h-64">
                                <Image
                                    src={
                                        product.image ||
                                        "/images/placeholder.jpg"
                                    }
                                    alt={product.name || "新着商品の画像"}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                    quality={75}
                                    priority={index < 3} // 最初の3つの画像を優先的に読み込む
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyUC0zLy0tMzJGQj82RVg/OkNWRkdYTFFTW0BNYWVhZkVGXnVed2P/2wBDARUXFx4aHR4eHUNDRkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0P/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                    placeholder="blur"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    {product.name}
                                </h3>
                                <Link
                                    href={`/products/${product.id}`}
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    詳細を見る
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-4 text-center">
                <Link
                    href="/products"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                    すべての作品を見る
                </Link>
            </section>
        </div>
    );
}
