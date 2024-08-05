import { WhopSDK } from "@whop-sdk/core";

export const whop = new WhopSDK({
	TOKEN: process.env.WHOP_API_KEY,
});
