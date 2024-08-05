import { WhopSDK, type Membership } from "@whop-sdk/core";
import type { UserOAuthService } from "@whop-sdk/core";

// main Whop SDK
export const whop = new WhopSDK({
	TOKEN: process.env.WHOP_API_KEY,
});

/**
 * helper to get a user's membership for a certain product
 * @returns boolean
 */
export async function getMembership(
	sdk: UserOAuthService,
	productId: string
): Promise<Membership | undefined> {
	const result = await sdk.listUsersMemberships({
		accessPassId: productId,
		valid: true,
	});

	return result.data ? result.data[0] : undefined;
}

/**
 * helper to check if a user has access to at least one of the given products,
 * @returns boolean
 */
export async function hasAccess(sdk: UserOAuthService, ...allowedProductIds: string[]) {
	const { data: memberships } = await sdk.listUsersMemberships({ valid: true });

	if (!memberships) {
		return false;
	}

	for (const membership of memberships) {
		if (membership.product && allowedProductIds.includes(membership.product)) {
			return true;
		}
	}

	return false;
}
