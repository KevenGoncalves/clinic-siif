import { Check, TriangleAlert } from "akar-icons";
import React, { useState } from "react";
import CriarAgendaModal from "./criar-agenda";

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
					className="text-orange-500 hover:text-orange-400"
				>
					<TriangleAlert size={20} />
				</button>
			</div>
			<CriarAgendaModal open={exams} setOpen={setExams} />
		</div>
	);
};

const NovaAgenda = () => {
	return (
		<div>
			<Card content="asdasdasd" />
			<Card content="asdasdasd" />
			<Card content="asdasdasd" />
			<Card content="asdasdasd" />
		</div>
	);
};

export default NovaAgenda;
