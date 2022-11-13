import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "../../lib/supabase-client";
import { trpc } from "../../lib/trpc";
import { CreateType } from "../../pages/login";
import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<CreateType>();
	const [state, setState] = useState(false);
	const context = trpc.useContext();

	useEffect(() => {
		supabase.auth
			.getUser()
			.then(async (snapshot) => {
				const email = snapshot.data.user?.email;
				const result = await context.user.byEmail.fetch({ email });
				setCurrentUser(result as any);
				setState(true);
			})
			.catch(() => toast.error("Algum erro aconteceu!"));
	}, []);

	if (!state) return <div>Loading...</div>;

	return (
		<div className="flex w-full">
			<ToastContainer />
			<div className="w-[19rem]">
				<Sidebar user={currentUser as any} />
			</div>
			<div className="w-full h-full min-h-screen bg-zinc-50">
				<Navbar />
				{children}
			</div>
		</div>
	);
};

export default Layout;
