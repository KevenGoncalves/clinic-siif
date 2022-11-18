import { Calendar as CalendarIcon, Heart, LinkOut, StatisticUp } from "akar-icons";
import React, { ReactNode, useState } from "react";
import MarcarConsultaModal from "../consultas/marcar-consulta";
import { useRouter } from "next/router";
import CriarMedicoModal from "../medicos/criar-medico";
import MedicoCalendar from "./medico-calendar";
import MedicoStatistics from "./medico-statistics";

const Navbar = () => {
	const [consulta, setConsulta] = useState(false);
	const [drop, setDrop] = useState(false);
	const [stats, setStats] = useState(false);
	const [create, setCreate] = useState(false);
	const router = useRouter();

	const handleDrop = () => setDrop(!drop);
	const handleStats = () => setStats(!stats);
	const handleOpen = () => setConsulta(true);
	const handleOpenCreate = () => setCreate(true);

	return (
		<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
			<div className="relative flex items-center justify-between">
				<a className="cursor-pointer inline-flex items-center">
					<Heart size={36} strokeWidth={2} />
					<span className="ml-2 text-lg font-bold tracking-wide text-gray-800 uppercase">
						Consultas Pré-Natais
					</span>
				</a>
				<ul className="flex items-center  space-x-8 lg:flex">
					{router.asPath == "/consultas" ? (
						<li>
							<button
								onClick={handleOpen}
								className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none gap-2"
							>
								Marcar Consulta
								<LinkOut strokeWidth={2} size={16} />
							</button>
						</li>
					) : null}
					{router.asPath == "/medicos" ? (
						<li>
							<button
								onClick={handleOpenCreate}
								className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none gap-2"
							>
								Criar Medico
								<LinkOut strokeWidth={2} size={16} />
							</button>
						</li>
					) : null}
					{router.asPath == "/agendas" ? (
						<>
							<li>
								<button
									onClick={handleStats}
									className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
								>
									<StatisticUp strokeWidth={2} size={24} />
								</button>

								<div
									className={`${
										stats ? "h-40 visible" : "h-0 invisible"
									} absolute right-10 z-20 overflow-y-clip  transition-all duration-500 py-2 mt-4 bg-white rounded-md shadow-xl dark:bg-gray-800`}
								>
									<div className="flex items-center justify-center ">
										<MedicoStatistics />
									</div>
								</div>
							</li>
							<li>
								<button
									onClick={handleDrop}
									className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
								>
									<CalendarIcon strokeWidth={2} size={24} />
								</button>

								<div
									className={`${
										drop ? "h-80 visible" : "h-0 invisible"
									} absolute -right-4 z-20 overflow-y-clip  transition-all duration-500 py-2 mt-4 bg-white rounded-md shadow-xl dark:bg-gray-800`}
								>
									<div className="flex items-center justify-center ">
										<MedicoCalendar />
									</div>
								</div>
							</li>
						</>
					) : null}
				</ul>
			</div>
			<MarcarConsultaModal open={consulta} setOpen={setConsulta} />
			<CriarMedicoModal open={create} setOpen={setCreate} />
		</div>
	);
};

export default Navbar;
