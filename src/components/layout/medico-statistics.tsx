import React, { useMemo, useState } from "react";
import { trpc } from "../../lib/trpc";
import { useAtom } from "jotai";
import { userAtom } from "../../atom/user-atom";
import { Consulta, Paciente, Medico } from "@prisma/client";

const useStatistics = (data: any) => {
	const [state, setState] = useState({
		news: 0,
		now: 0,
		concluded: 0,
		rejected: 0,
	});

	console.log(data);

	useMemo(() => {
		if (data) {
			data?.map((consulta: any) => {
				if (consulta.consultaState === "PENDENTE") setState((state) => ({ ...state, news: state.news + 1 }));
				if (consulta.consultaState === "PROGRESSO") setState((state) => ({ ...state, now: state.now + 1 }));
				if (consulta.consultaState === "CONCLUIDA")
					setState((state) => ({ ...state, concluded: state.concluded + 1 }));
				if (consulta.consultaState === "REJEITADA")
					setState((state) => ({ ...state, rejected: state.rejected + 1 }));
			});
		}
	}, [data]);

	return state;
};

const MedicoStatistics = () => {
	const [medico] = useAtom(userAtom);
	const consultas = trpc.consulta.allByMedicoId.useQuery({ medicoId: medico?.Medico?.id! });
	const { concluded, news, now, rejected } = useStatistics(consultas.data);

	return (
		<div className="w-60 flex flex-col gap-2 p-4">
			<div className="flex items-center justify-between">
				<span className="font-medium">Novas Agendas:</span>
				<span>{news}</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium">Agendas Atuais:</span>
				<span>{now}</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium">Agendas Concluidas:</span>
				<span>{concluded}</span>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium">Agendas Rejeitadas:</span>
				<span>{rejected}</span>
			</div>
		</div>
	);
};

export default MedicoStatistics;
