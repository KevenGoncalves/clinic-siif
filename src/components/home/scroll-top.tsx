import { ArrowUp } from "akar-icons";
import React from "react";

const ScrollTop = () => {
	const handleScroll = () => {
		const top = document.querySelector("#inicio");
		top?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<button
			onClick={handleScroll}
			className="fixed bottom-3 right-3 bg-white shadow-lg p-2 rounded-full text-blue-500 hover:bg-zinc-50"
		>
			<ArrowUp />
		</button>
	);
};

export default ScrollTop;
