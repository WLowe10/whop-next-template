"use client";

import { signIn, signOut } from "next-auth/react";
import type { PropsWithChildren } from "react";

import styles from "@/styles/home.module.css";

export type AuthButtonProps = {
	loggedIn?: boolean;
};

export const AuthButton = ({ loggedIn, children }: PropsWithChildren<AuthButtonProps>) => {
	return (
		<button className={styles.card} onClick={() => (loggedIn ? signOut() : signIn("whop"))}>
			{children}
		</button>
	);
};
