import { getUserSdk } from "@/lib/get-user-sdk/app";
import { getMembership } from "@/lib/whop";
import { allowedProducts } from "@/constants";
import type { Membership } from "@whop-sdk/core";
import styles from "@/styles/home.module.css";
import { auth } from "@/lib/auth";

/**
 * The Layout of this level is product-gated, which makes
 * and page child gated without extra configuration.
 */
export default async function GatedProductPage() {
	/**
	 * get the sdk and membership again here, this is
	 * only done to get the data and not to verify the user
	 * owns the product. if the user does not own the product this
	 * section will never be rendered as the layout already
	 * verifies that the product is owned.
	 */
	const { sdk } = await auth();

	// todo this reflects original functionality of the template, but should be revisited
	const membership = (await getMembership(sdk!, allowedProducts[0]!)) as Membership;

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
						<code className={styles.code}>app/ssr/page.tsx</code>
					</p>
				</div>

				<div className={styles.center}>
					<div className={styles.otherbox}>
						<h1>
							Access <a href="#">Granted 🚀</a>
						</h1>
						<p>
							This page is shown to a user who is signed in, and owns your required
							product!
						</p>
					</div>
				</div>
				<div
					className={styles.grid}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<a
						href={
							"https://whop.com/hub/" + membership.id + "?utm_source=nextjs-template"
						}
						className={styles.card}
					>
						<h2>Customer Portal &rarr;</h2>
						<p>Manage your billing and access.</p>
					</a>

					<a
						href={
							"https://whop.com/hub/" + membership.id + "?utm_source=nextjs-template"
						}
						className={styles.card}
					>
						<h2>Leave a review &rarr;</h2>
						<p>If you like this web app, leave a review!</p>
					</a>
				</div>
			</main>
		</div>
	);
}
