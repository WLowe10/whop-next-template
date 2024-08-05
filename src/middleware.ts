import { NextResponse, type MiddlewareConfig } from "next/server";
import withAuth from "next-auth/middleware";
import { getPurchaseLink } from "@/utils/whop";
import { getUserSdk, hasAccess } from "@/lib/whop";
import { allowedProducts, recommendedPlan } from "./constants";

// this middleware is used to restrict access to the pages behing /ssg

export const config: MiddlewareConfig = {
	matcher: ["/ssg/product-gated"],
};

export default withAuth(async (req) => {
	const token = req.nextauth.token?.accessToken as string;

	// redirect the user if they are not authenticated
	if (!token) {
		return NextResponse.redirect("/ssr");
	}

	const sdk = getUserSdk(token);

	// check if user has access to any of the allowed products
	const userHasAccess = await hasAccess(sdk, ...allowedProducts);

	// redirects to Whop checkout for the recommended product if the user does not have a membership
	if (!userHasAccess) {
		return NextResponse.redirect(getPurchaseLink(recommendedPlan, req.nextUrl.pathname));
	}

	return NextResponse.next();
});
