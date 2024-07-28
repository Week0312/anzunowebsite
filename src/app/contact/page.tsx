import { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
    title: "お問い合わせ",
    description:
        "Your Company Nameへのお問い合わせはこちらから。ご質問やご相談をお待ちしています。",
};

export default function ContactPage() {
    return <ContactContent />;
}
