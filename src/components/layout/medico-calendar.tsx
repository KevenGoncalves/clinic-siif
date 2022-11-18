import React, { useState } from "react";
import { trpc } from "../../lib/trpc";
import { useAtom } from "jotai";
import { userAtom } from "../../atom/user-atom";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MedicoCalendar = () => {
	const [medico] = useAtom(userAtom);
	const consultas = trpc.consulta.allByMedicoId.useQuery({ medicoId: medico?.Medico?.id! });
	const consultasFiltradas = consultas.data?.filter((consulta: any) => consulta.consultaState === "PROGRESSO");
	const [value, onChange] = useState(new Date());

	return (
		<Calendar
			tileClassName={({ date, view }) => {
				const newDates = consultasFiltradas?.map((d) => new Date(d.date).toDateString());

				if (newDates?.includes(date.toDateString())) return "!bg-zinc-700 !text-white hover:!bg-zinc-500";
				return null;
			}}
			onChange={onChange}
			value={value}
		/>
	);
};

export default MedicoCalendar;
