import type { Metadata } from "next";
import styles from "@/styles/home.module.css";

export const metadata: Metadata = {
	title: "Whop Powered Application (SSG)",
};

/**
 * this page is protected by the middleware, so if
 * no ssg-bailouts are used in here this page will
 * be statically served
 */
export default function GatedProductPage() {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<div className={styles.description}>
					<a
						href="/ssr"
						className={styles.card}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span>&lt;-</span> Go back
					</a>
					<p>
						Edit this page inside of{" "}
						<code className={styles.code}>app/ssg/product-gated/page.tsx</code>
					</p>
				</div>

				<div className={styles.center}>
					<div className={styles.otherbox}>
						<h1>Access Granted 🚀 (SSG)</h1>
						<p>
							This page is protected by the middleware, so if no SSG bailouts are used
							here, the page will be statically served.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
