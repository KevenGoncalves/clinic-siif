import { EyeOpen, Newspaper } from "akar-icons";
import { useState } from "react";
import ExamsModal from "../consultas/exams-modal";
import ObservationModal from "../consultas/observation-modal";

const Card = ({ content }: { content: string }) => {
	const [exams, setExams] = useState(false);
	const [observation, setObservations] = useState(false);

	const handleOpenExams = () => setExams(true);
	const handleOpenObservations = () => setObservations(true);

	return (
		<div className="w-full p-4 shadow-md my-4 rounded-md bg-white font-medium flex items-center justify-between hover:bg-blue-50 transition-colors duration-200">
			<div>{content}</div>
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
			<ObservationModal open={observation} setOpen={setObservations} />
			<ExamsModal open={exams} setOpen={setExams} />
		</div>
	);
};

const AgendaPassada = () => {
	return (
		<div>
			<Card content="asds" />
			<Card content="asds" />
			<Card content="asds" />
			<Card content="asds" />
		</div>
	);
};

export default AgendaPassada;
