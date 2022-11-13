import React, { useMemo, useState } from "react";
import Layout from "../components/shared/layout";
import Title from "../components/shared/title";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Calendar as IconCalendar, EyeOpen, File, Newspaper, PeopleMultiple } from "akar-icons";
import Card from "../components/consultas/card";
import Stat from "../components/consultas/stats";
import { trpc } from "../lib/trpc";
import { useAtom } from "jotai";
import { userAtom } from "../atom/user-atom";
import Loading from "../components/shared/loading";
import { Consulta, Medico, Paciente } from "@prisma/client";
import NoContent from "../components/shared/no-content";

const useStatistics = (
	data:
		| (Consulta & {
				paciente: Paciente;
				medico: Medico;
		  })[]
		| undefined
) => {
	const contextUtils = trpc.useContext();
	const [state, setState] = useState({
		consultasTotais: 0,
		examesTotais: 0,
		observacoesTotais: 0,
		medico: "-",
		ultimaConsulta: "-",
		proximaConsulta: "-",
	});

	useMemo(() => {
		data?.map((consulta) => {
			if (consulta.exams !== null) setState((state) => ({ ...state, examesTotais: state.examesTotais + 1 }));
			if (consulta.observations !== null)
				setState((state) => ({ ...state, observacoesTotais: state.observacoesTotais + 1 }));
			if (consulta.consultaState === "CONCLUIDA")
				setState((state) => ({ ...state, consultasTotais: state.consultasTotais + 1 }));
		});

		if (data != undefined) {
			setState((state) => ({
				...state,
				ultimaConsulta: data![data!.length - 2]?.date,
				proximaConsulta: data![data!.length - 1]?.date,
			}));

			contextUtils.medico.byId.fetch({ id: data![data!.length - 1]?.medicoId ?? "" }).then((data) =>
				setState((state) => ({
					...state,
					medico: `${data?.user.firstName ?? ""} ${data?.user.lastName ?? ""}`,
				}))
			);
		}
	}, [data]);

	return state;
};

const Dashboard = () => {
	const [value, onChange] = useState(new Date());
	const [paciente] = useAtom(userAtom);
	const consultas = trpc.consulta.allByPacienteId.useQuery({ pacienteId: paciente?.paciente?.id! });
	const statistics = useStatistics(consultas.data);
	const dates = consultas.data?.map((consulta) => consulta.date);

	if (consultas.isLoading) return <Loading />;

	return (
		<Layout>
			<div className="px-10 pb-10">
				<Title title="Estatisticas" />
				<div className="flex gap-4">
					<Stat>
						<div className="flex items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<File size={24} strokeWidth={2} />
								<span className="text-lg">Consultas Totais:</span>
							</div>
							<div className="text-lg">{statistics.consultasTotais}</div>
						</div>
						<div className="flex items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<Newspaper size={24} strokeWidth={2} />
								<span className="text-lg">Exames Totais:</span>
							</div>
							<div className="text-lg">{statistics.examesTotais}</div>
						</div>
						<div className="flex items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<EyeOpen size={24} strokeWidth={2} />
								<span className="text-lg">Observações Totais:</span>
							</div>
							<div className="text-lg">{statistics.consultasTotais}</div>
						</div>
						<div className="flex items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<PeopleMultiple size={24} strokeWidth={2} />
								<span className="text-lg">Médico:</span>
							</div>
							<div className="text-lg">{statistics.medico}</div>
						</div>
						<div className="flex items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<IconCalendar size={24} strokeWidth={2} />
								<span className="text-lg">Ultima Consulta:</span>
							</div>
							<div className="text-lg">{statistics.ultimaConsulta}</div>
						</div>
						<div className="flex  items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<File size={24} strokeWidth={2} />
								<span className="text-lg">Próxima Consulta:</span>
							</div>
							<div className="text-lg">{statistics.ultimaConsulta}</div>
						</div>
					</Stat>
					<Stat>
						<div className="flex items-center justify-center ">
							<Calendar
								onChange={onChange}
								value={value}
								tileClassName={({ date, view }) => {
									const newDates = dates!.map((d) => new Date(d).toDateString());

									if (newDates.includes(date.toDateString()))
										return "!bg-zinc-700 !text-white hover:!bg-zinc-500";
									return null;
								}}
							/>
						</div>
					</Stat>
				</div>
				<Title title="Consultas" />
				<div>
					{consultas.data?.map((consulta, index) => (
						<Card consulta={consulta} key={index} />
					))}
					{consultas.data?.length === 0 ? <NoContent title="Sem Consultas" /> : null}
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
