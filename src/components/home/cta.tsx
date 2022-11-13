import Image from "next/image";
import React from "react";
import medico from "../../../public/images/medico.jpg";
import horario from "../../../public/images/horario.jpg";
import registro from "../../../public/images/registro.jpg";
import consultas from "../../../public/images/consultas.jpg";

const Cta = () => {
	return (
		<div
			id="como"
			className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
		>
			<div className="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
				<h2 className="max-w-lg mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:mb-6 group">
					<span className="inline-block mb-1 sm:mb-4">Como Fazemos?</span>
					<div className="h-1 ml-auto duration-300 origin-left transform bg-blue-600 scale-x-30 group-hover:scale-x-100" />
				</h2>
			</div>
			<div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2">
				<a>
					<div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
						<Image className="object-cover w-full h-56 md:h-64 xl:h-80" src={medico} alt="" />
						<div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-blue-700 bg-opacity-75 opacity-0 hover:opacity-100">
							<p className="mb-4 text-lg font-bold text-gray-100">Medicos</p>
							<p className="text-sm tracking-wide text-gray-300">
								Temos medicos especializados e de confiança
							</p>
						</div>
					</div>
				</a>
				<a>
					<div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
						<Image className="object-cover w-full h-56 md:h-64 xl:h-80" src={horario} alt="" />
						<div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-blue-700 bg-opacity-75 opacity-0 hover:opacity-100">
							<p className="mb-4 text-lg font-bold text-gray-100">Horário</p>
							<p className="text-sm tracking-wide text-gray-300">
								Fazemos isso a tempo e hora que desejares!
							</p>
						</div>
					</div>
				</a>
				<a>
					<div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
						<Image className="object-cover w-full h-56 md:h-64 xl:h-80" src={registro} alt="" />
						<div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-blue-700 bg-opacity-75 opacity-0 hover:opacity-100">
							<p className="mb-4 text-lg font-bold text-gray-100">Registos</p>
							<p className="text-sm tracking-wide text-gray-300">
								Guardamos todos os dados necessarios para teres as tuas consultas a tempo e hora
							</p>
						</div>
					</div>
				</a>
				<a>
					<div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
						<Image className="object-cover w-full h-56 md:h-64 xl:h-80" src={consultas} alt="" />
						<div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-blue-700 bg-opacity-75 opacity-0 hover:opacity-100">
							<p className="mb-4 text-lg font-bold text-gray-100">Consultas</p>
							<p className="text-sm tracking-wide text-gray-300">
								Se tiver sugestões de melhorias para ter melhor experiencia de consultas não exite em
								nos contactar
							</p>
						</div>
					</div>
				</a>
			</div>
		</div>
	);
};

export default Cta;
