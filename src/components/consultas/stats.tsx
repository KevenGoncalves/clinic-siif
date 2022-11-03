import { ReactNode } from "react";

const Stat = ({ children }: { children: ReactNode }) => (
	<div className="w-full p-4 shadow-md my-4 rounded-md bg-white font-medium">{children}</div>
);

export default Stat;
