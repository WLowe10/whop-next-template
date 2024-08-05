import { WhopSDK } from "@whop-sdk/core/browser";
import { NextRequestWithAuth } from "next-auth/middleware";

/**
 * gets the UserService from the WhopSDK from the session
 * @in middleware
 */
export function getUserSdk(req: NextRequestWithAuth) {
	const token = req.nextauth.token?.accessToken as string;

	if (!token) return null;

	return new WhopSDK({ TOKEN: token }).userOAuth;
}
