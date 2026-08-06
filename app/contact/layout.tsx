import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact Us",
	description:
		"Get in touch with Global Sight Services Limited. Send us a message and we'll get back to you to discuss how we can help your enterprise grow.",
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
