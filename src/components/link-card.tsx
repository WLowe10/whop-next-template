import { Inter } from "next/font/google";
import styles from "@/styles/home.module.css";

const inter = Inter({ subsets: ["latin"] });

export type LinkCardProps = {
	title: string;
	text: string;
	href: string;
};

export const LinkCard = ({ title, text, href }: LinkCardProps) => {
	return (
		<a target="_blank" rel="noopener noreferrer" className={styles.card} href={href}>
			<h2 className={inter.className}>
				{title} <span>-&gt;</span>
			</h2>
			<p className={inter.className}>{text}</p>
		</a>
	);
};
