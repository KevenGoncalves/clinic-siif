import { Consulta, Medico, Paciente } from "@prisma/client";
import { Cross, EyeOpen, Newspaper } from "akar-icons";
import { useState } from "react";
import { trpc } from "../../lib/trpc";
import CancelarConsulta from "./cancelar-modal";
import ExamsModal from "./exams-modal";
import ObservationModal from "./observation-modal";

const States = ({ state }: { state: any }) => {
	if (state == "PROGRESSO") return <div className="bg-blue-500 rounded-lg p-1 px-3 text-white">Em Progresso</div>;
	if (state == "CONCLUIDA") return <div className="bg-emerald-500 rounded-lg p-1 px-3 text-white">Concluida</div>;
	if (state == "REJEITADA") return <div className="bg-red-500 rounded-lg p-1 px-3 text-white">Rejeitada</div>;

	return <div className="bg-zinc-500 rounded-lg p-1 px-3 text-white">Esperando aprovação</div>;
};

const Card = ({ consulta }: { consulta: any }) => {
	const [exams, setExams] = useState(false);
	const [observation, setObservations] = useState(false);
	const [del, setDel] = useState(false);
	const { data } = trpc.medico.byId.useQuery({ id: consulta.medicoId });

	const handleOpenExams = () => setExams(true);
	const handleOpenObservations = () => setObservations(true);
	const handleCancelar = () => setDel(true);

	return (
		<>
			<div className="w-full p-4 shadow-md my-4 rounded-md bg-white font-medium flex items-center justify-between hover:bg-blue-50 transition-colors duration-200">
				<div className="flex items-center gap-4">
					<States state={consulta.consultaState!} />
					{consulta.date} com Médico: {data?.user.firstName} {data?.user.lastName}
				</div>
				{consulta.consultaState == "CONCLUIDA" ? (
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
				) : null}
				{consulta.consultaState == "PENDENTE" ? (
					<div>
						<button
							aria-label="Observações"
							title="Cancelar"
							onClick={handleCancelar}
							className="text-red-500 hover:text-red-400"
						>
							<Cross />
						</button>
					</div>
				) : null}
			</div>

			<CancelarConsulta content={consulta} open={del} setOpen={setDel} />
			<ObservationModal content={consulta.observations!} open={observation} setOpen={setObservations} />
			<ExamsModal content={consulta.exams!} open={exams} setOpen={setExams} />
		</>
	);
};

export default Card;
