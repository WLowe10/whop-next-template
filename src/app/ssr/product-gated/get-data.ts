import { whop } from "@/lib/whop";
import { cache } from "react";

export const retrievePlan = cache((id: string) => {
	return whop.plans.retrievePlan({ id });
});

export const retrieveProduct = cache((id: string) => {
	return whop.products.retrieveProduct({ id });
});
