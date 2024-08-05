import { cache } from "react";
import { WhopSDK } from "@whop-sdk/core";
import { getServerAuthSession } from "../auth";

/**
 * gets the UserService from the WhopSDK from the session
 * @in Server Components in the app directory
 * @dev wrapped in React.cache so other helpers that rely
 * on it can be properly cached too
 */
export const getUserSdk = async () => {
	const session = await getServerAuthSession();

	if (!session) {
		return null;
	}

	return new WhopSDK({ TOKEN: session.accessToken }).userOAuth;
};
