import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { userAtom } from "../../atom/user-atom";
import { supabase } from "../../lib/supabase-client";
import { trpc } from "../../lib/trpc";
import { CreateType } from "../../pages/login";
import { useAtom } from "jotai";
import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import Loading from "./loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [state, setState] = useState(false);
	const [value, updateValue] = useAtom(userAtom);
	const context = trpc.useContext();

	useEffect(() => {
		supabase.auth
			.getUser()
			.then(async (snapshot) => {
				const email = snapshot.data.user?.email;
				const result = await context.user.byEmail.fetch({ email });
				updateValue(result);
				setState(true);
			})
			.catch(() => toast.error("Algum erro aconteceu!"));
	}, []);

	if (!state) return <Loading />;

	return (
		<div className="flex w-full">
			<ToastContainer />
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
