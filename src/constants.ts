export const allowedProducts = process.env.NEXT_PUBLIC_REQUIRED_PRODUCT?.split(",") || [];
export const recommendedPlan = process.env.NEXT_PUBLIC_RECOMMENDED_PLAN_ID as string;
