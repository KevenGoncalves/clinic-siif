import { Medico, User } from "@prisma/client";
import { Cross, LinkOut } from "akar-icons";
import React, { useState } from "react";
import ApagarMedicoModal from "../components/medicos/apagar-medico";
import VerMedicoModal from "../components/medicos/ver-medico";
import Layout from "../components/shared/layout";
import Loading from "../components/shared/loading";
import NoContent from "../components/shared/no-content";
import Title from "../components/shared/title";
import { trpc } from "../lib/trpc";

const Card = ({ medico }: { medico: Medico & { user: User } }) => {
	const [paciente, setPaciente] = useState(false);
	const [delet, setDelete] = useState(false);

	const handleOpenPaciente = () => setPaciente(true);
	const handleOpenDelete = () => setDelete(true);

	return (
		<div className="w-full p-4 shadow-md my-4 rounded-md bg-white font-medium flex items-center justify-between hover:bg-blue-50 transition-colors duration-200">
			<div>{`${medico.user.bi} - ${medico.user.firstName} ${medico.user.lastName} - ${medico.time}`}</div>
			<div className="flex items-center gap-4">
				<button title="Ver" onClick={handleOpenPaciente} className="text-blue-500 hover:text-blue-400">
					<LinkOut size={20} />
				</button>
				<button title="Apagar" onClick={handleOpenDelete} className="text-red-500 hover:text-red-400">
					<Cross size={20} />
				</button>
			</div>
			<ApagarMedicoModal medico={medico} open={delet} setOpen={setDelete} />
			<VerMedicoModal medicoParams={medico} open={paciente} setOpen={setPaciente} />
		</div>
	);
};

const Medicos = () => {
	const medicos = trpc.medico.all.useQuery();

	if (medicos.isLoading) return <Loading />;

	return (
		<Layout>
			<div className="px-10 pb-10">
				<Title title="Medicos" />
				<div>
					{medicos.data?.map((medico, index) => (
						<Card key={index} medico={medico} />
					))}
					{medicos.data?.length === 0 ? <NoContent title="Sem Médicos" /> : null}
				</div>
			</div>
		</Layout>
	);
};

export default Medicos;
