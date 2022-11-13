import { ArrowCycle } from "akar-icons";
import { useAtom } from "jotai";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import { userAtom } from "../../atom/user-atom";
import { trpc } from "../../lib/trpc";

const consulta = z.object({
	medicoId: z.string(),
	pacienteId: z.string(),
	date: z.string().min(1),
});

type consultaType = z.infer<typeof consulta>;

const MarcarConsultaModal = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
	const [loader, setLoader] = useState(false);
	const [paciente] = useAtom(userAtom);
	const [marcarConsulta, setMarcarConsulta] = useState<consultaType>({ date: "", medicoId: "", pacienteId: "" });
	const handleClose = () => setOpen(false);
	const medicos = trpc.medico.all.useQuery();
	const marcarMutation = trpc.consulta.create.useMutation();
	const pacienteConsultas = trpc.useContext();
	const call = useMemo(() => {
		setMarcarConsulta({
			...marcarConsulta,
			medicoId: medicos.isLoading ? "" : medicos.data![0].id,
			pacienteId: paciente?.paciente?.id!,
		});
	}, [medicos.data]);

	if (!open) return null;
	if (medicos.isLoading) return <div>Loading</div>;
	if (medicos.isSuccess) call;

	const handleMarcarConsulta = async () => {
		try {
			setLoader(true);
			const marcarParsed = consulta.parse(marcarConsulta);
			await marcarMutation.mutateAsync(marcarParsed);
			toast.success("Consulta Marcada, Espere pela Aprovação")!;
			await pacienteConsultas.consulta.allByPacienteId.refetch({ pacienteId: paciente?.paciente?.id! });
			setOpen(false);
		} catch (error) {
			console.log(error);
			toast.error("Algum erro aconteceu!");
		} finally {
			setLoader(false);
		}
	};

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
								Marcar Consulta
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

						<div className="leading-relaxed p-6 space-y-4">
							<div className="grid grid-cols-2 gap-2">
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
										Medico
									</label>
									<select
										value={marcarConsulta.medicoId}
										onChange={(event) =>
											setMarcarConsulta({ ...marcarConsulta, medicoId: event.target.value })
										}
										className="block w-full px-4 py-3 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
									>
										{medicos.data?.map((medico, index) => (
											<option key={index} value={medico.id}>
												{medico.user.firstName} {medico.user.lastName}
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
										Dia
									</label>
									<input
										onChange={(event) =>
											setMarcarConsulta({ ...marcarConsulta, date: event.target.value })
										}
										type={"date"}
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
									/>
								</div>
							</div>
							<div className="space-x-4 flex justify-end">
								<button
									onClick={handleMarcarConsulta}
									className="bg-blue-500 text-white py-2 px-10 rounded shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 flex items-center justify-center gap-2"
								>
									Criar
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

export default MarcarConsultaModal;
