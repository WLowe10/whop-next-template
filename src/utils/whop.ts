export const getPurchaseLink = (plan: string, redirect: URL | string) => {
	const href = new URL(`https://whop.com/checkout/${plan}`);

	href.searchParams.set("onSuccess", redirect instanceof URL ? redirect.href : redirect);

	return href;
};
