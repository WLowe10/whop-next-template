"use client";

import Link from "next/link";
import { getPurchaseLink } from "@/utils/whop";
import type { PropsWithChildren } from "react";

export type PurchaseLinkProps = {
	plan: string;
	redirect: string;
	className?: string;
};

export const PurchaseLink = ({
	plan,
	redirect,
	className,
	children,
}: PropsWithChildren<PurchaseLinkProps>) => {
	const link = getPurchaseLink(plan, redirect);

	return (
		<Link className={className} href={link}>
			{children}
		</Link>
	);
};
