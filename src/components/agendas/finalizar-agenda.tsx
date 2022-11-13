import { Consulta, Medico, Paciente } from "@prisma/client";
import { ArrowCycle } from "akar-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { trpc } from "../../lib/trpc";

const AgendaZ = z.object({
	exams: z.string().min(8),
	observations: z.string().min(8),
});

type agendaType = z.infer<typeof AgendaZ>;

const FinalizarAgendaModal = ({
	agenda,
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	agenda: Consulta & {
		paciente: Paciente;
		medico: Medico;
	};
}) => {
	const handleClose = () => setOpen(false);
	const [end, setEnd] = useState<agendaType>({ exams: "", observations: "" });
	const updateMutation = trpc.consulta.update.useMutation();
	const contextUtil = trpc.useContext();
	const [loader, setLoader] = useState(false);

	const handleFinalization = async () => {
		try {
			setLoader(true);
			const endParsed = AgendaZ.parse(end);
			await updateMutation.mutateAsync({
				date: agenda.date,
				id: agenda.id,
				medicoId: agenda.medicoId,
				pacienteId: agenda.pacienteId,
				consultaState: "CONCLUIDA",
				exams: endParsed.exams,
				observations: endParsed.observations,
			});
			await contextUtil.consulta.allByMedicoId.refetch({ medicoId: agenda.medicoId });
			setOpen(false);
			toast.success("Consulta finalizada!");
		} catch (error) {
			toast.error("Algum erro aconteceu!");
			console.log(error);
		} finally {
			setLoader(false);
		}
	};

	if (!open) return null;

	return (
		<div className="max-w-2xl mx-auto">
			<div className="overflow-x-hidden bg-black/10 backdrop-blur-sm overflow-y-auto fixed h-full left-0 right-0 inset-0 z-50 justify-center items-center">
				<ToastContainer />
				<div className="top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 relative w-full max-w-2xl h-auto">
					{/* Modal content */}
					<div className="bg-white rounded-lg shadow-md relative dark:bg-black m-2 dark:border dark:border-zinc-500">
						{/* Modal header */}
						<div className="flex items-start justify-between p-5 border-b rounded-t dark:border-zinc-800">
							<h3 className="text-zinc-900 text-xl lg:text-2xl font-semibold dark:text-white">
								Finalizar Agenda
							</h3>
							<button
								onClick={handleClose}
								className="text-zinc-400 bg-transparent hover:bg-zinc-200 hover:text-zinc-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-zinc-600 dark:hover:text-white"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>
						{/* Modal body */}

						<div className="leading-relaxed p-6 space-y-6">
							<>
								<div className="mt-2">
									<label
										className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
										htmlFor="LoggingEmailAddress"
									>
										Exames
									</label>
									<textarea
										onChange={(event) => setEnd({ ...end, exams: event.target.value })}
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
									/>
								</div>
								<div className="mt-2">
									<label
										className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
										htmlFor="LoggingEmailAddress"
									>
										Observações
									</label>
									<textarea
										onChange={(event) => setEnd({ ...end, observations: event.target.value })}
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
									/>
								</div>
							</>
							<div className="flex justify-end gap-4">
								<button
									onClick={handleFinalization}
									className="bg-blue-500 text-white py-2 px-10 rounded shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 flex items-center justify-center gap-2"
								>
									Aceitar
									{!loader ? null : <ArrowCycle size={16} className="animate-spin" />}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FinalizarAgendaModal;
