import React from "react";

const Title = ({ title }: { title: string }) => {
	return (
		<div className="flex w-full flex-col mt-4">
			<div className="text-xl font-medium uppercase">{title}</div>
			<div className="bg-zinc-200 h-[2px] mt-1"></div>
		</div>
	);
};

export default Title;
