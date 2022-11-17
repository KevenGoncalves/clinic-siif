import { ArrowCycle } from "akar-icons";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "../lib/supabase-client";
import { trpc } from "../lib/trpc";

const Process = () => {
	const context = trpc.useContext();
	const router = useRouter();
	useEffect(() => {
		supabase.auth
			.getUser()
			.then(async (snapshot) => {
				const email = snapshot.data.user?.email;
				const result = await context.user.byEmail.fetch({ email });

				if (result?.role === "PACIENTE") {
					router.push("/consultas");
					return;
				}

				if (result?.role === "MEDICO") {
					router.push("/agendas");
				}

				if (result?.role === "ADMIN") {
					router.push("/medicos");
				}
			})
			.catch(() => {
				toast.error("Algum erro aconteceu!");
				setTimeout(() => {
					router.push("/login");
				}, 2000);
			});
	});

	return (
		<>
			<Head>
				<title>Processando...</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="w-full h-screen flex items-center justify-center text-blue-500">
				<ArrowCycle size={96} className="animate-spin" />
				<ToastContainer />
			</div>
		</>
	);
};

export default Process;
