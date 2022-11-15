import { Consulta, Paciente, User } from "@prisma/client";
import { LinkOut } from "akar-icons";
import React, { useState } from "react";
import VerPacienteModal from "../components/pacientes/ver-paciente";
import Layout from "../components/shared/layout";
import Loading from "../components/shared/loading";
import NoContent from "../components/shared/no-content";
import Title from "../components/shared/title";
import { trpc } from "../lib/trpc";

const Card = ({
	content,
}: {
	content: Paciente & {
		Consulta: Consulta[];
		user: User;
	};
}) => {
	const [paciente, setPaciente] = useState(false);

	const handleOpenPaciente = () => setPaciente(true);

	return (
		<div className="w-full p-4 shadow-md my-4 rounded-md bg-white font-medium flex items-center justify-between hover:bg-blue-50 transition-colors duration-200">
			<div>
				{content.user.firstName} {content.user.lastName} {content.user.bi}
			</div>
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
			<VerPacienteModal paciente={content} open={paciente} setOpen={setPaciente} />
		</div>
	);
};

const Pacientes = () => {
	const pacientes = trpc.paciente.all.useQuery();

	if (pacientes.isLoading) return <Loading />;

	return (
		<Layout>
			<div className="px-10 pb-10">
				<Title title="Pacientes" />
				<div>
					{pacientes.data?.map((paciente, index) => (
						<Card content={paciente} key={index} />
					))}
					{pacientes.data?.length === 0 ? <NoContent title="Sem Pacientes" /> : null}
				</div>
			</div>
		</Layout>
	);
};

export default Pacientes;
