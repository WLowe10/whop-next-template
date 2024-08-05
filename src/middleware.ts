import { NextResponse } from "next/server";
import withAuth from "next-auth/middleware";
import getSdk from "@/lib/get-user-sdk/middleware";
import getPurchaseLink from "@/lib/get-purchase-link";
import findProduct from "@/lib/has-product";

const ALLOWED_PRODUCTS: string[] = process.env.NEXT_PUBLIC_REQUIRED_PRODUCT?.split(",") || [];
const RECOMMENDED_PLAN = process.env.NEXT_PUBLIC_RECOMMENDED_PLAN_ID || "";

export const config = {
	matcher: ["/ssg/product-gated"],
};

export default withAuth(async (req) => {
	const { sdk } = getSdk(req);

	if (!sdk) return NextResponse.redirect("/ssr");

	const membership = await findProduct(sdk, ALLOWED_PRODUCTS);

	if (!membership) {
		// redirects to Whop checkout if the user does not have a membership
		return NextResponse.redirect(
			getPurchaseLink(RECOMMENDED_PLAN, req.nextUrl.pathname, req.nextUrl)
		);
	}

	return NextResponse.next();
});
