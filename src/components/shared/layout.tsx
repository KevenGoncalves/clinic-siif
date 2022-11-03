import React from "react";
import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex w-full">
			<div className="w-[19rem]">
				<Sidebar />
			</div>
			<div className="w-full h-full min-h-screen bg-zinc-50">
				<Navbar />
				{children}
			</div>
		</div>
	);
};

export default Layout;
