import { NextResponse, type MiddlewareConfig } from "next/server";
import withAuth from "next-auth/middleware";
import { getUserSdk } from "@/lib/get-user-sdk/middleware";
import { getPurchaseLink } from "@/utils/whop";
import { hasAccess } from "@/lib/whop";
import { allowedProducts, recommendedPlan } from "./constants";

export const config: MiddlewareConfig = {
	matcher: ["/ssg/product-gated"],
};

export default withAuth(async (req) => {
	const sdk = getUserSdk(req);

	if (!sdk) {
		return NextResponse.redirect("/ssr");
	}

	// check if user has access to any of the allowed products
	const userHasAccess = await hasAccess(sdk, ...allowedProducts);

	// redirects to Whop checkout for the recommended product if the user does not have a membership
	if (!userHasAccess) {
		return NextResponse.redirect(getPurchaseLink(recommendedPlan, req.nextUrl.pathname));
	}

	return NextResponse.next();
});
