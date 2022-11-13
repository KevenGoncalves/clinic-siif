import { ArrowCycle } from "akar-icons";
import React from "react";

const Loading = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center text-blue-500">
			<ArrowCycle size={96} className="animate-spin" />
		</div>
	);
};

export default Loading;
