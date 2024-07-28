import { Metadata } from "next";
import NewsContent from "./NewsContent";

export const metadata: Metadata = {
    title: "お知らせ",
    description: "Your Company Nameの最新ニュースと更新情報をご覧ください。",
};

export default function NewsPage() {
    return <NewsContent />;
}
