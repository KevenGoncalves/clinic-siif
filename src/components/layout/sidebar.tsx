import { Person, File, PeopleMultiple, SignOut, Calendar } from "akar-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
	const router = useRouter();
	return (
		<div className="fixed flex flex-col w-64 h-screen py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
			<div className="flex flex-col items-center mt-2 -mx-2">
				<div className="object-cover w-24 h-24 mx-2 rounded-full bg-blue-500 text-white flex items-center justify-center">
					<Person strokeWidth={2} size={50} />
				</div>
				<h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
					Keven Gonçalves
				</h4>
				<p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:underline">
					Paciente
				</p>
			</div>
			<div className="flex flex-col justify-between flex-1 mt-6">
				<nav>
					<Link
						className={`flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform ${
							router.asPath == "/consultas"
								? "text-gray-700 bg-gray-100"
								: "text-gray-600 hover:text-gray-700 hover:bg-gray-200"
						}`}
						href="/consultas"
					>
						<File strokeWidth={2} size={20} />
						<span className="mx-4 font-medium">Consultas</span>
					</Link>
					<Link
						className={`flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform ${
							router.asPath == "/agendas"
								? "text-gray-700 bg-gray-100"
								: "text-gray-600 hover:text-gray-700 hover:bg-gray-200"
						}`}
						href="/agendas"
					>
						<Calendar strokeWidth={2} size={20} />
						<span className="mx-4 font-medium">Agendas</span>
					</Link>
					<Link
						className={`flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform ${
							router.asPath == "/pacientes"
								? "text-gray-700 bg-gray-100"
								: "text-gray-600 hover:text-gray-700 hover:bg-gray-200"
						}`}
						href="/pacientes"
					>
						<Person strokeWidth={2} size={20} />
						<span className="mx-4 font-medium">Pacientes</span>
					</Link>
					<Link
						className={`flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform ${
							router.asPath == "/medicos"
								? "text-gray-700 bg-gray-100"
								: "text-gray-600 hover:text-gray-700 hover:bg-gray-200"
						}`}
						href="/medicos"
					>
						<PeopleMultiple strokeWidth={2} size={20} />
						<span className="mx-4 font-medium">Medicos</span>
					</Link>
					<a
						className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
						href="#"
					>
						<SignOut strokeWidth={2} size={20} />
						<span className="mx-4 font-medium">Sair</span>
					</a>
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
