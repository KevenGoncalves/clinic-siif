import { Medico, User } from "@prisma/client";
import { ArrowCycle } from "akar-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { trpc } from "../../lib/trpc";
import { CreateType, CreateUser } from "../../pages/login";
import { createUser } from "../../services/auth.service";

const VerMedicoModal = ({
	open,
	setOpen,
	medicoParams,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	medicoParams: Medico & { user: User };
}) => {
	const handleClose = () => setOpen(false);
	const [loader, setLoader] = useState(false);
	const [newUser, setCreateUser] = useState<CreateType>({ ...medicoParams.user, password: "" });
	const [medico, setMedico] = useState({ time: medicoParams.time });
	const updateUser = trpc.user.update.useMutation();
	const updateMedico = trpc.medico.update.useMutation();
	const contextUtils = trpc.useContext();

	const handleUpdate = async () => {
		try {
			setLoader(true);

			await updateUser.mutateAsync({ ...newUser, id: medicoParams.userId });
			await updateMedico.mutateAsync({ time: medico.time, userId: medicoParams.userId });

			toast.success("Conta atualizada!");
			await contextUtils.medico.all.refetch();
			setOpen(false);
		} catch (error) {
			toast.error("Algum Erro aconteceu!");
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
								Criar Médico
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
										Nome
									</label>
									<input
										value={newUser.firstName}
										onChange={(event) =>
											setCreateUser({ ...newUser, firstName: event.target.value })
										}
										type={"text"}
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
									/>
								</div>
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
										Apelido
									</label>
									<input
										value={newUser.lastName}
										onChange={(event) =>
											setCreateUser({ ...newUser, lastName: event.target.value })
										}
										type={"text"}
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-2">
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
										BI
									</label>
									<input
										value={newUser.bi}
										onChange={(event) => setCreateUser({ ...newUser, bi: event.target.value })}
										type={"text"}
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
									/>
								</div>

								<div>
									<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
										Data de Nacimento
									</label>
									<input
										value={newUser.birthday}
										onChange={(event) =>
											setCreateUser({ ...newUser, birthday: event.target.value })
										}
										type={"date"}
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-2">
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
										E-mail
									</label>
									<input
										value={newUser.email}
										onChange={(event) => setCreateUser({ ...newUser, email: event.target.value })}
										type={"email"}
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
									/>
								</div>
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
										Senha
									</label>
									<input
										value={newUser.password}
										onChange={(event) =>
											setCreateUser({ ...newUser, password: event.target.value })
										}
										type={"password"}
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
									/>
								</div>
							</div>
							<div className="grid grid-cols-1 gap-2">
								<div>
									<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
										Horario
									</label>
									<input
										value={medico.time}
										onChange={(event) => setMedico({ time: event.target.value })}
										type={"text"}
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
									/>
								</div>
							</div>
							<div className="space-x-4 flex justify-end">
								<button
									onClick={handleUpdate}
									className="bg-blue-500 text-white py-2 px-10 rounded shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 flex items-center justify-center gap-2"
								>
									Atualizar
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

export default VerMedicoModal;
