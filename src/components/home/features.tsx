import { Bell, EyeOpen, FaceWink, File, PeopleMultiple } from "akar-icons";

const Features = () => {
	return (
		<div
			id="servicos"
			className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10"
		>
			<div className="flex flex-col items-center justify-center px-4  mx-auto sm:max-w-xl md:max-w-full  md:px-0">
				<div className="flex flex-col items-center max-w-2xl md:px-8 text-zinc-900">
					<div className="max-w-xl  md:mx-auto sm:text-center lg:max-w-2xl mb-2">
						<h2 className="max-w-lg  font-sans text-3xl font-bold leading-none tracking-tight  sm:text-4xl md:mx-auto">
							Os Nossos Serviços
						</h2>
					</div>
				</div>

				<div className="grid row-gap-8 sm:row-gap-0 sm:grid-cols-2 lg:grid-cols-3">
					<div className="p-8 border-b sm:border-r">
						<div className="max-w-md text-center">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600 sm:w-16 sm:h-16">
								<svg
									className="w-8 h-8 text-white sm:w-12 sm:h-12"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth={3}
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</div>
							<h6 className="mb-2 font-semibold leading-5">Marcação Rápida</h6>
							<p className="mb-3 text-sm text-gray-900">
								Fazemos as marcações para ti de uma forma rapida
							</p>
						</div>
					</div>
					<div className="p-8 border-b lg:border-r">
						<div className="max-w-md text-center">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600 sm:w-16 sm:h-16 text-white">
								<Bell />
							</div>
							<h6 className="mb-2 font-semibold leading-5">Notificação</h6>
							<p className="mb-3 text-sm text-gray-900">
								Notificamos para ti todos os dias das consultas
							</p>
						</div>
					</div>
					<div className="p-8 border-b sm:border-r lg:border-r-0">
						<div className="max-w-md text-center">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600 sm:w-16 sm:h-16 text-white">
								<File />
							</div>
							<h6 className="mb-2 font-semibold leading-5">Registro de Exames</h6>
							<p className="mb-3 text-sm text-gray-900">
								Todos os exames feitos ficam guardados aqui e pode consultar a qualquer hora
							</p>
						</div>
					</div>
					<div className="p-8 border-b lg:border-b-0 lg:border-r">
						<div className="max-w-md text-center">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600 sm:w-16 sm:h-16 text-white">
								<EyeOpen />
							</div>
							<h6 className="mb-2 font-semibold leading-5">Registro de Observações</h6>
							<p className="mb-3 text-sm text-gray-900">
								Também guardamos as observações que foram te dado para consultares a qualquer hora
							</p>
						</div>
					</div>
					<div className="p-8 border-b sm:border-b-0 sm:border-r">
						<div className="max-w-md text-center">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600 sm:w-16 sm:h-16 text-white">
								<PeopleMultiple />
							</div>
							<h6 className="mb-2 font-semibold leading-5">Escolha o médico</h6>
							<p className="mb-3 text-sm text-gray-900">
								Você pode escolher o medico que deseja ser atendida
							</p>
						</div>
					</div>
					<div className="p-8">
						<div className="max-w-md text-center">
							<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600 sm:w-16 sm:h-16 text-white">
								<FaceWink />
							</div>
							<h6 className="mb-2 font-semibold leading-5">Grátis</h6>
							<p className="mb-3 text-sm text-gray-900">O sistema é totalmente grátis para o seu uso</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Features;
