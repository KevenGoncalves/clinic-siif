import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Layout from "../components/shared/layout";
import { ArrowRepeat, Check, Plus } from "akar-icons";
import NovaAgenda from "../components/agendas/nova-agenda";
import AgendaAtual from "../components/agendas/agenda-atual";
import AgendaPassada from "../components/agendas/agenda-passada";

const Component = () => (
	<Tabs>
		<TabList className="flex flex-col py-4">
			<div className="flex items-center justify-center cursor-pointer">
				<Tab className="p-3" selectedClassName="bg-white p-3 rounded shadow">
					<div className="w-44 flex items-center justify-center gap-2 font-medium">
						<Plus strokeWidth={2} size={20} />
						Novas Agendas
					</div>
				</Tab>
				<Tab className="p-3" selectedClassName="bg-white p-3 rounded shadow">
					<div className="w-44 flex items-center justify-center gap-2 font-medium">
						<Check strokeWidth={2} size={20} />
						Agendas Atuais
					</div>
				</Tab>
				<Tab className="p-3" selectedClassName="bg-white p-3 rounded shadow">
					<div className="w-44 flex items-center justify-center gap-2 font-medium">
						<ArrowRepeat strokeWidth={2} size={20} />
						Agendas Passadas
					</div>
				</Tab>
			</div>
			<div className="flex w-full flex-col mt-3">
				<div className="bg-zinc-200 h-[2px]"></div>
			</div>
		</TabList>

		<TabPanel>
			<NovaAgenda />
		</TabPanel>
		<TabPanel>
			<AgendaAtual />
		</TabPanel>
		<TabPanel>
			<AgendaPassada />
		</TabPanel>
	</Tabs>
);

const Agendas = () => {
	return (
		<Layout>
			<div className="px-10 pb-10">
				<Component />
			</div>
		</Layout>
	);
};

export default Agendas;
