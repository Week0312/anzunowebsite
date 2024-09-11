import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity,
        0
    );

    if (cart.length === 0) {
        return <div>カートは空です</div>;
    }

    return (
        <div>
            {cart.map((item) => (
                <div
                    key={item.id}
                    className="flex justify-between items-center mb-4"
                >
                    <div>
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
                    </div>
                    <div>
                        <button
                            onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                            }
                        >
                            -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                            onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                            }
                        >
                            +
                        </button>
                        <button onClick={() => removeFromCart(item.id)}>
                            削除
                        </button>
                    </div>
                </div>
            ))}
            <div>合計: ¥{total.toFixed(2)}</div>
            <Link
                href="/checkout"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                チェックアウトへ進む
            </Link>
        </div>
    );
}
