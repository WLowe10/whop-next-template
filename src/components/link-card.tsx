import styles from "@/styles/home.module.css";

export type LinkCardProps = {
	title: string;
	text: string;
	href: string;
};

export const LinkCard = ({ title, text, href }: LinkCardProps) => {
	return (
		<a target="_blank" rel="noopener noreferrer" className={styles.card} href={href}>
			<h2>
				{title} <span>-&gt;</span>
			</h2>
			<p>{text}</p>
		</a>
	);
};
