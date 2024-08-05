import Image from "next/image";
import { LinkCard } from "@/components/link-card";
import type { Metadata } from "next";
import styles from "@/styles/home.module.css";

export const meta: Metadata = {
	title: "Whop powered application",
	description: "Whop web application using Next.js",
};

export default function HomePage() {
	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>
					Get started by editing&nbsp;
					<code className={styles.code}>app/page.tsx</code>
				</p>
				<div>
					<a
						href="https://dash.whop.com?utm_source=nextjs-template"
						target="_blank"
						rel="noopener noreferrer"
					>
						By{" "}
						<picture>
							<source srcSet="/whop-dark.png" media="(prefers-color-scheme: dark)" />
							<Image
								src="/whop-light.png"
								alt="Whop Logo"
								className={styles.vercelLogo}
								width={115}
								height={24}
								priority
							/>
						</picture>
					</a>
				</div>
			</div>
			<div className={styles.center}>
				<div className={styles.thirteen}>
					<Image src="/logo.svg" alt="Whop W" width={110} height={100} priority />
				</div>
			</div>
			<div className={styles.grid}>
				<LinkCard
					title="App (Next.js 14)"
					text="View an implementation of our payment gate with the app directory."
					href="/ssr"
				/>
				<LinkCard
					title="Documentation"
					text="Explore the full capability of Whop's API"
					href="https://docs.whop.com/software-intro?utm_source=nextjs-template"
				/>
				<LinkCard
					title="Whop University"
					text="Join Whop university to learn more about Whop."
					href="https://whop.com/hub/whop"
				/>
				<LinkCard
					title="Discord"
					text="Join our Whop Discord community for on-demand support."
					href="https://discord.gg/whop-869380404887560203"
				/>
			</div>
		</main>
	);
}
