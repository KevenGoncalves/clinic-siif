import React, { useState } from "react";
import Layout from "../components/shared/layout";
import Title from "../components/shared/title";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Calendar as IconCalendar, EyeOpen, File, Newspaper, PeopleMultiple } from "akar-icons";
import Card from "../components/consultas/card";
import Stat from "../components/consultas/stats";

const Dashboard = () => {
	const [value, onChange] = useState(new Date());

	return (
		<Layout>
			<div className="px-10 pb-10">
				<Title title="Estatisticas" />
				<div className="flex gap-4">
					<Stat>
						<div className="flex items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<File size={24} strokeWidth={2} />
								<span className="text-lg">Consultas Totais:</span>
							</div>
							<div className="text-lg">9</div>
						</div>
						<div className="flex items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<Newspaper size={24} strokeWidth={2} />
								<span className="text-lg">Exames Totais:</span>
							</div>
							<div className="text-lg">9</div>
						</div>
						<div className="flex items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<EyeOpen size={24} strokeWidth={2} />
								<span className="text-lg">Observações Totais:</span>
							</div>
							<div className="text-lg">9</div>
						</div>
						<div className="flex items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<PeopleMultiple size={24} strokeWidth={2} />
								<span className="text-lg">Médico:</span>
							</div>
							<div className="text-lg">Keven Gonçalves</div>
						</div>
						<div className="flex items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<IconCalendar size={24} strokeWidth={2} />
								<span className="text-lg">Ultima Consulta:</span>
							</div>
							<div className="text-lg">10/10/2022</div>
						</div>
						<div className="flex items-center my-4 justify-between">
							<div className="flex gap-4 items-center">
								<File size={24} strokeWidth={2} />
								<span className="text-lg">Próxima Consulta:</span>
							</div>
							<div className="text-lg">24/10/2022</div>
						</div>
					</Stat>
					<Stat>
						<div className="flex items-center justify-center">
							<Calendar onChange={onChange} value={value} />
						</div>
					</Stat>
				</div>
				<Title title="Consultas" />
				<div>
					<Card content="Sskdlakd" />
					<Card content="Sskdlakd" />
					<Card content="Sskdlakd" />
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
