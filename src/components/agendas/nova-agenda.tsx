import { Consulta, Paciente, Medico } from "@prisma/client";
import { Check, TriangleAlert } from "akar-icons";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { userAtom } from "../../atom/user-atom";
import { trpc } from "../../lib/trpc";
import Loading from "../shared/loading";
import NoContent from "../shared/no-content";
import CriarAgendaModal from "./criar-agenda";

const Card = ({
	content,
}: {
	content: Consulta & {
		paciente: Paciente;
		medico: Medico;
	};
}) => {
	const [exams, setExams] = useState(false);
	const getPaciente = trpc.paciente.byUserId.useQuery({ userId: content.paciente.userId });
	const handleOpenExams = () => setExams(true);

	return (
		<div className="w-full p-4 shadow-md my-4 rounded-md bg-white font-medium flex items-center justify-between hover:bg-blue-50 transition-colors duration-200">
			<div>
				{getPaciente.data?.user.firstName} {getPaciente.data?.user.lastName} - {content.date}
			</div>
			<div className="flex items-center gap-4">
				<button
					aria-label="Exames"
					title="Exames"
					onClick={handleOpenExams}
					className="text-orange-500 hover:text-orange-400"
				>
					<TriangleAlert size={20} />
				</button>
			</div>
			<CriarAgendaModal agenda={content} open={exams} setOpen={setExams} />
		</div>
	);
};

const NovaAgenda = () => {
	const [medico] = useAtom(userAtom);
	const novasAgendas = trpc.consulta.allByMedicoId.useQuery({ medicoId: medico?.Medico?.id! });
	if (novasAgendas.isLoading) return <Loading />;
	const novasAgendasFiltradas = novasAgendas.data?.filter((agenda) => agenda.consultaState === "PENDENTE");

	return (
		<div>
			{novasAgendasFiltradas?.map((agenda, index) => (
				<Card content={agenda} key={index} />
			))}
			{novasAgendasFiltradas?.length === 0 ? <NoContent title="Sem Agendas" /> : null}
		</div>
	);
};

export default NovaAgenda;
