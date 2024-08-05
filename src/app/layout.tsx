import type { PropsWithChildren } from "react";

import "@/styles/globals.css";

export const metadata = {
	title: "Whop Powered Application (SSR)",
	icons: {
		icon: [{ url: "/logo.svg" }, new URL("/logo.svg", "https://whop.com")],
	},
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
