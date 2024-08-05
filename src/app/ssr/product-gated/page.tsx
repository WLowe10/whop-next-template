import { getMembership } from "@/lib/whop";
import { allowedProducts } from "@/constants";
import { requireAuth } from "@/lib/auth";
import { whop } from "@/lib/whop";
import { recommendedPlan } from "@/constants";
import styles from "@/styles/home.module.css";
import { PurchaseLink } from "@/components/purchase-link";

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
	const { sdk } = await requireAuth({
		failureRedirect: "/ssr",
	});

	// find the membership
	// todo this reflects original functionality of the template, but should be revisited
	const membership = await getMembership(sdk, allowedProducts[0]!);

	let recommendedProduct;

	if (!membership) {
		/**
		 * fetch the recommended product to display what users
		 * will be buying.
		 */
		recommendedProduct = await whop.plans.retrievePlan({ id: recommendedPlan });
	}

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<a href="/ssr" className={styles.card} target="_blank" rel="noopener noreferrer">
					<span>&lt;-</span> Go back
				</a>
				<p>
					Edit this page inside of{" "}
					<code className={styles.code}>app/ssr/product-gated/page.tsx</code>
				</p>
			</div>

			<div className={styles.center}>
				<div className={styles.otherbox}>
					<h1>{membership ? "Access Granted 🚀" : "Purchase Access To Product"}</h1>
					<p style={{ marginBottom: 10 }}>
						{membership
							? "This page is shown to a user who is signed in, and owns your required product!"
							: "This page is shown to a user who is signed in but does not currently own a Product."}
					</p>

					{membership ? (
						<code>{JSON.stringify(membership, null, "\t")}</code>
					) : (
						<>
							<p style={{ textAlign: "center" }} className={styles.card}>
								User has membership: No
							</p>
							<p style={{ textAlign: "center" }} className={styles.card}>
								Reccomended pricing plan:{" "}
								<code>{JSON.stringify(recommendedProduct, null, "\t")}</code>
							</p>
						</>
					)}
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
				{membership ? (
					<>
						<a
							href={
								"https://whop.com/hub/" +
								membership.id +
								"?utm_source=nextjs-template"
							}
							className={styles.card}
						>
							<h2>Customer Portal &rarr;</h2>
							<p>Manage your billing and access.</p>
						</a>

						<a
							href={
								"https://whop.com/hub/" +
								membership.id +
								"?utm_source=nextjs-template"
							}
							className={styles.card}
						>
							<h2>Leave a review &rarr;</h2>
							<p>If you like this web app, leave a review!</p>
						</a>
					</>
				) : (
					<PurchaseLink className={styles.card} plan={recommendedPlan}>
						<h2>Buy Access &rarr;</h2>
						<p>Purchase via Whop.</p>{" "}
					</PurchaseLink>
				)}
			</div>
		</main>
	);
}
