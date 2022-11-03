import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import loginImage from "../../public/images/pre-natal-login.jpg";

const Login = () => {
	const router = useRouter();
	const [change, setChange] = useState(false);

	const handleChange = () => setChange(!change);

	return (
		<section className="w-full h-screen flex items-center justify-center bg-zinc-50">
			<div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
				<div
					className={` ${
						change ? "translate-x-[28rem]" : "translate-x-0"
					} transition-transform duration-1000  bg-cover z-20 lg:block lg:w-1/2`}
					style={{
						backgroundImage: `url("${loginImage.src}")`,
					}}
				/>
				<div
					className={` ${
						change ? "-translate-x-[28rem]" : "translate-x-0"
					} transition-transform duration-1000 w-full px-6 py-8 md:px-8 lg:w-1/2`}
				>
					<h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
						Sistema de Consultas <br /> Pré-Natais
					</h2>

					<div className="flex items-center justify-between mt-4">
						<span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />
						<a className="cursor-pointer text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline ">
							{change ? "Cadastre-se no sistema" : "Faça login com email"}
						</a>
						<span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
					</div>
					<div className="mt-4">
						<label
							className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
							htmlFor="LoggingEmailAddress"
						>
							E-mail
						</label>
						<input
							id="LoggingEmailAddress"
							className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
							type="email"
						/>
					</div>
					<div className="mt-4">
						<div className="flex justify-between">
							<label
								className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
								htmlFor="loggingPassword"
							>
								Senha
							</label>
							{change ? null : (
								<a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">
									Esqueceu Senha?
								</a>
							)}
						</div>
						<input
							id="loggingPassword"
							className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
							type="password"
						/>
					</div>
					<div className="mt-8">
						<button
							onClick={() => router.push("/consultas")}
							className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
						>
							{change ? "Cadastrar" : "Entrar"}
						</button>
					</div>
					<div className="flex items-center justify-between mt-4">
						<span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
						<button
							onClick={handleChange}
							className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
						>
							{change ? "ou entre" : "ou faça registo"}
						</button>
						<span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
