import { useState, useEffect } from "react";

export const useLocation = () => {
	const [location, setLocation] = useState<string | undefined>();

	useEffect(() => {
		setLocation(window.location.href);
	}, []);

	return location;
};
