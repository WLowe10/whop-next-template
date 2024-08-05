import { redirect } from "next/navigation";
import { whop, getMembership } from "@/lib/whop";
import { PurchaseLink } from "@/components/purchase-link";
import type { PropsWithChildren } from "react";

import styles from "@/styles/home.module.css";
import { allowedProducts, recommendedPlan } from "@/constants";
import { requireAuth } from "@/lib/auth";

export default async function SSRProductGatedLayout({ children }: PropsWithChildren) {
	const { sdk } = await requireAuth({
		failureRedirect: "/ssr",
	});

	// find the membership
	// todo this reflects original functionality of the template, but should be revisited
	const membership = await getMembership(sdk, allowedProducts[0]!);

	// show a buy link if no membership matches
	if (!membership) {
		/**
		 * fetch the recommended product to display what users
		 * will be buying.
		 */

		const recommendedProduct = await whop.plans.retrievePlan({ id: recommendedPlan });

		return (
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
						<code className={styles.code}>app/ssr/layout.tsx</code>
					</p>
				</div>

				<div className={styles.center}>
					<div className={styles.otherbox}>
						<h1
							style={{
								paddingLeft: "5px",
							}}
						>
							Purchase Access To Product
						</h1>
						<div
							style={{
								paddingTop: "20px",
							}}
						>
							<p className={styles.card}>
								This page is shown to a user who is signed in but does not currently
								own a Product.
							</p>

							<p className={styles.card}>
								Required product to own:{" "}
								<code>{JSON.stringify(membership, null, "\t")}</code>
							</p>

							<p style={{ textAlign: "center" }} className={styles.card}>
								Reccomended pricing plan:{" "}
								<code>{JSON.stringify(recommendedProduct, null, "\t")}</code>
							</p>

							<p style={{ textAlign: "center" }} className={styles.card}>
								User has membership: No
							</p>
						</div>
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
					{/*  todo redirect */}
					<PurchaseLink
						className={styles.card}
						plan={recommendedPlan}
						redirect={"https://google.com"}
					>
						<h2>Buy Access &rarr;</h2>
						<p>Purchase via Whop.</p>{" "}
					</PurchaseLink>{" "}
				</div>
			</main>
		);
	}

	return children;
}
