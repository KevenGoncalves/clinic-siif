import Image from "next/image";
import React from "react";
import heroImage from "../../../public/images/pre-natal-login.jpg";

const Hero = () => {
	return (
		<div id="inicio" className="relative bg-blue-600 py-20">
			<div className="absolute inset-x-0 bottom-0">
				<svg
					viewBox="0 0 224 12"
					fill="currentColor"
					className="w-full -mb-1 text-white"
					preserveAspectRatio="none"
				>
					<path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
				</svg>
			</div>
			<div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-16">
				<div className="flex flex-col items-center justify-center px-4  mx-auto sm:max-w-xl md:max-w-full  md:px-0">
					<div className="flex flex-col items-center max-w-2xl md:px-8">
						<div className="max-w-xl  md:mx-auto sm:text-center lg:max-w-2xl mb-2">
							<h2 className="max-w-lg  font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
								Seja Bem Vindo ao Sistema de Consultas Pré Natais
							</h2>
						</div>
						<p className="max-w-md mb-10 text-xs text-gray-100 sm:text-sm md:text-center">
							Com o nosso sistema podes marcar <br /> as tuas consultas com alguns cliques
						</p>
					</div>
					<Image
						loading="lazy"
						placeholder="blur"
						src={heroImage}
						className="w-full max-w-screen-sm mx-auto rounded shadow-2xl md:w-auto lg:max-w-screen-sm"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
