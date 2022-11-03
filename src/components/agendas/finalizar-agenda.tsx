import { Dispatch, SetStateAction } from "react";

const FinalizarAgendaModal = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
	const handleClose = () => setOpen(false);

	if (!open) return null;

	return (
		<div className="max-w-2xl mx-auto">
			<div className="overflow-x-hidden bg-black/10 backdrop-blur-sm overflow-y-auto fixed h-full left-0 right-0 inset-0 z-50 justify-center items-center">
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

						<div className="leading-relaxed p-6 space-y-6">Ola</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FinalizarAgendaModal;
