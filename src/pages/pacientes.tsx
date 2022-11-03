import { LinkOut } from "akar-icons";
import React, { useState } from "react";
import VerPacienteModal from "../components/pacientes/ver-paciente";
import Layout from "../components/shared/layout";
import Title from "../components/shared/title";

const Card = ({ content }: { content: string }) => {
	const [paciente, setPaciente] = useState(false);

	const handleOpenPaciente = () => setPaciente(true);

	return (
		<div className="w-full p-4 shadow-md my-4 rounded-md bg-white font-medium flex items-center justify-between hover:bg-blue-50 transition-colors duration-200">
			<div>{content}</div>
			<div className="flex items-center gap-4">
				<button
					aria-label="Exames"
					title="Exames"
					onClick={handleOpenPaciente}
					className="text-blue-500 hover:text-blue-400"
				>
					<LinkOut size={20} />
				</button>
			</div>
			<VerPacienteModal open={paciente} setOpen={setPaciente} />
		</div>
	);
};

const Pacientes = () => {
	return (
		<Layout>
			<div className="px-10 pb-10">
				<Title title="Pacientes" />
				<div>
					<Card content="fggdfg" />
					<Card content="fggdfg" />
					<Card content="fggdfg" />
					<Card content="fggdfg" />
				</div>
			</div>
		</Layout>
	);
};

export default Pacientes;
