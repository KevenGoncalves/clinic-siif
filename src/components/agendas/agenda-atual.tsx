import { Check } from "akar-icons";
import React, { useState } from "react";
import FinalizarAgendaModal from "./finalizar-agenda";

const Card = ({ content }: { content: string }) => {
	const [exams, setExams] = useState(false);

	const handleOpenExams = () => setExams(true);

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
					<Check />
				</button>
			</div>
			<FinalizarAgendaModal open={exams} setOpen={setExams} />
		</div>
	);
};

const AgendaAtual = () => {
	return (
		<div>
			<Card content="asdas" />
			<Card content="asdas" />
			<Card content="asdas" />
		</div>
	);
};

export default AgendaAtual;
