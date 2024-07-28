import { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
    title: "ホーム",
    description:
        "Your Company Nameへようこそ。私たちの製品とサービスについてご覧ください。",
};

export default function HomePage() {
    return <HomeContent />;
}
