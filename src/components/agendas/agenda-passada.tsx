import { Consulta, Paciente, Medico } from "@prisma/client";
import { Cross, EyeOpen, Newspaper } from "akar-icons";
import { useAtom } from "jotai";
import { useState } from "react";
import { userAtom } from "../../atom/user-atom";
import { trpc } from "../../lib/trpc";
import ExamsModal from "../consultas/exams-modal";
import ObservationModal from "../consultas/observation-modal";
import Loading from "../shared/loading";
import NoContent from "../shared/no-content";

const Card = ({
	content,
}: {
	content: Consulta & {
		paciente: Paciente;
		medico: Medico;
	};
}) => {
	const getPaciente = trpc.paciente.byUserId.useQuery({ userId: content.paciente.userId });
	const [exams, setExams] = useState(false);
	const [observation, setObservations] = useState(false);
	const handleOpenExams = () => setExams(true);
	const handleOpenObservations = () => setObservations(true);

	return (
		<div className="w-full p-4 shadow-md my-4 rounded-md bg-white font-medium flex items-center justify-between hover:bg-blue-50 transition-colors duration-200">
			<div>
				{getPaciente.data?.user.firstName} {getPaciente.data?.user.lastName} - {content.date}
			</div>
			{content.consultaState === "REJEITADA" ? (
				<div className="text-red-500 p-1" title="Rejeitada">
					<Cross />
				</div>
			) : (
				<div className="flex items-center gap-4">
					<button
						aria-label="Exames"
						title="Exames"
						onClick={handleOpenExams}
						className="text-blue-500 hover:text-blue-400"
					>
						<Newspaper />
					</button>
					<button
						aria-label="Observações"
						title="Observações"
						onClick={handleOpenObservations}
						className="text-emerald-500 hover:text-emerald-400"
					>
						<EyeOpen />
					</button>
				</div>
			)}
			<ObservationModal content={content.observations!} open={observation} setOpen={setObservations} />
			<ExamsModal content={content.exams!} open={exams} setOpen={setExams} />
		</div>
	);
};

const AgendaPassada = () => {
	const [medico] = useAtom(userAtom);
	const agendasPassadas = trpc.consulta.allByMedicoId.useQuery({ medicoId: medico?.Medico?.id! });
	if (agendasPassadas.isLoading) return <Loading />;
	const agendasPassadasFiltradas = agendasPassadas.data?.filter(
		(agenda) => (agenda.consultaState as any) === "CONCLUIDA" || (agenda.consultaState as any) === "REJEITADA"
	);

	return (
		<div>
			{agendasPassadasFiltradas?.map((agenda, index) => (
				<Card content={agenda} key={index} />
			))}
			{agendasPassadasFiltradas?.length === 0 ? <NoContent title="Sem Agendas" /> : null}
		</div>
	);
};

export default AgendaPassada;
