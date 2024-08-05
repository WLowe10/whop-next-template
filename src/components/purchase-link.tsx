"use client";

import Link from "next/link";
import { getPurchaseLink } from "@/utils/whop";
import { useLocation } from "@/hooks/use-location";
import type { PropsWithChildren } from "react";

export type PurchaseLinkProps = {
	plan: string;
	redirectPath?: string;
	className?: string;
};

export const PurchaseLink = ({
	plan,
	redirectPath,
	className,
	children,
}: PropsWithChildren<PurchaseLinkProps>) => {
	const location = useLocation();
	const link = getPurchaseLink(plan, location ?? "" + redirectPath);

	return (
		<Link className={className} href={link}>
			{children}
		</Link>
	);
};
