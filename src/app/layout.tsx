import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Whop Powered Application (SSR)",
	icons: [
		{
			rel: "icon",
			url: "/logo.svg",
		},
	],
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" className={inter.className}>
			<body>{children}</body>
		</html>
	);
}
