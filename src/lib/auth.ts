import { cache } from "react";
import { redirect } from "next/navigation";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { WhopSDK } from "@whop-sdk/core";

declare module "next-auth" {
	interface Session {
		accessToken: string;
		user: {
			id: string;
		};
	}
	interface JWT {
		accessToken: string;
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		{
			id: "whop",
			name: "Whop",
			type: "oauth" as const,
			authorization: "https://whop.com/oauth",
			token: "https://api.whop.com/api/v5/oauth/token",
			userinfo: "https://api.whop.com/api/v5/me",
			clientId: process.env.WHOP_CLIENT_ID,
			clientSecret: process.env.WHOP_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
			profile(profile: {
				id: string;
				username: string;
				email: string;
				profile_pic_url: string;
			}) {
				return {
					id: profile.id,
					name: profile.username,
					email: profile.email,
					image: profile.profile_pic_url,
				};
			},
		},
	],
	callbacks: {
		async session({ session, token }) {
			session.user.id = token.id as string;
			session.accessToken = token.accessToken as string;

			return session;
		},
		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id;
			}

			if (account) {
				token.accessToken = account.access_token;
			}

			return token;
		},
	},
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

export const auth = cache(async () => {
	const session = await getServerAuthSession();

	if (!session) {
		return {
			session,
			user: null,
			sdk: null,
		};
	}

	return {
		session,
		user: session.user,
		sdk: new WhopSDK({ TOKEN: session.accessToken }).userOAuth,
	};
});

export type RequireAuthOpts = {
	failureRedirect: string;
};

export async function requireAuth(opts: RequireAuthOpts) {
	const result = await auth();

	if (!result.session) {
		return redirect(opts.failureRedirect);
	}

	return result;
}
