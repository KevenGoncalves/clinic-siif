import { Heart, SignOut } from "akar-icons";
import Link from "next/link";

const Click = (elemento: string) => {
	const alvo = document.querySelector(`#${elemento}`);
	alvo?.scrollIntoView({ behavior: "smooth" });
};

const HomeNavbar = () => {
	return (
		<div className="bg-blue-600 text-white fixed top-0 z-20 w-full">
			<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
				<div className="relative flex items-center justify-between">
					<a aria-label="Company" title="Company" className="inline-flex items-center">
						<Heart size={36} strokeWidth={2} />

						<span className="ml-2 text-xl font-bold tracking-wide  uppercase">Consultas Pré-Natais</span>
					</a>
					<ul className="flex items-center space-x-8 lg:flex -ml-36">
						<li>
							<a
								onClick={() => Click("inicio")}
								className="font-medium tracking-wide  transition-colors duration-200 hover:border-b-2 cursor-pointer"
							>
								Inicio
							</a>
						</li>
						<li>
							<a
								onClick={() => Click("servicos")}
								className="font-medium tracking-wide  transition-colors duration-200 hover:border-b-2 cursor-pointer"
							>
								Serviços
							</a>
						</li>
						<li>
							<a
								onClick={() => Click("como")}
								className="font-medium tracking-wide  transition-colors duration-200 hover:border-b-2 cursor-pointer"
							>
								Como Fazemos
							</a>
						</li>
					</ul>
					<ul className="flex items-center space-x-8 lg:flex">
						<li>
							<Link
								href="/login"
								className="inline-flex gap-2 items-center justify-center h-12 px-6 font-medium tracking-wide text-blue-600 transition duration-200 rounded shadow-md bg-white hover:bg-zinc-50 focus:shadow-outline focus:outline-none"
								aria-label="Sign up"
								title="Sign up"
							>
								Entrar
								<SignOut />
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default HomeNavbar;
