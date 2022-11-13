import { ArrowCycle } from "akar-icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import loginImage from "../../public/images/pre-natal-login.jpg";
import { trpc } from "../lib/trpc";
import { createUser, login, recovery } from "../services/auth.service";
import { toast, ToastContainer } from "react-toastify";

const User = z.object({
	email: z.string().email().min(1),
	password: z.string().min(8),
});

export const CreateUser = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email().min(1),
	password: z.string().min(8),
	birthday: z.string(),
	bi: z.string(),
});

const Paciente = z.object({
	weeks: z.number().default(0),
	state: z.boolean().default(true),
});

export type UserType = z.infer<typeof User>;
export type CreateType = z.infer<typeof CreateUser>;
export type PacienteType = z.infer<typeof Paciente>;

const Login = () => {
	const router = useRouter();
	const [change, setChange] = useState(false);
	const [user, setUser] = useState<UserType>({ email: "", password: "" });
	const [newUser, setCreateUser] = useState<CreateType>({
		bi: "",
		birthday: "",
		email: "",
		firstName: "",
		lastName: "",
		password: "",
	});
	const [paciente, setPaciente] = useState<PacienteType>({
		state: true,
		weeks: 0,
	});
	const handleChange = () => setChange(!change);
	const [loader, setLoader] = useState(false);
	const userMutation = trpc.user.create.useMutation();
	const pacienteMutation = trpc.paciente.create.useMutation();
	const contextUtils = trpc.useContext();

	const handleLogin = async () => {
		try {
			setLoader(true);
			const userParsed = User.parse(user);
			const result = await login(userParsed);

			if (result.data.user) {
				router.push("/process");
			}

			if (result.error) {
				throw new Error(result.error.message);
			}
		} catch (error) {
			toast.error("Algum erro aconteceu!");
		} finally {
			setLoader(false);
		}
	};

	const handleCreateUser = async () => {
		try {
			setLoader(true);
			const newUserParsed = CreateUser.parse(newUser);
			const res = await contextUtils.user.byEmail.fetch({ email: newUserParsed.email });

			if (res?.email) {
				toast.warning("E-mail já existente!");
				return;
			}

			const userResponse = await userMutation.mutateAsync({ ...newUserParsed, role: "PACIENTE" });

			if (!userMutation.isLoading) {
				await pacienteMutation.mutateAsync({ ...paciente, userId: userResponse.id });

				const result = await createUser(newUserParsed);

				if (result.data) {
					toast.success("Conta criada!");
				}
				if (result?.error) {
					throw new Error(result.error.message);
				}
			}
		} catch (error) {
			toast.error("Algum erro aconteceu!");
		} finally {
			setLoader(false);
		}
	};

	const handleRecovery = async () => {
		try {
			const result = await recovery(user);
			console.log(result);
			toast.success("Email de recuperação enviado!");
			if (result.error) {
				throw new Error(result.error.message);
			}
		} catch (error) {
			toast.error("Algum erro aconteceu!");
		}
	};

	return (
		<section className="w-full h-screen flex items-center justify-center bg-zinc-50">
			<ToastContainer />
			<div className="flex h-[35rem] w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
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
					} transition-transform flex items-center justify-center flex-col  duration-1000 w-full px-6 py-8 md:px-8 lg:w-1/2`}
				>
					<div>
						<h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
							Sistema de Consultas <br /> Pré-Natais
						</h2>

						<div className="flex items-center justify-between mt-2">
							<span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />
							<a className="cursor-pointer text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline ">
								{change ? "Cadastre-se no sistema" : "Faça login com email"}
							</a>
							<span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
						</div>

						{change ? (
							<>
								<div className="mt-2 grid grid-cols-2 gap-2">
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
											Nome
										</label>
										<input
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
											onChange={(event) =>
												setCreateUser({ ...newUser, lastName: event.target.value })
											}
											type={"text"}
											className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
										/>
									</div>
								</div>
								<div className="mt-2 grid grid-cols-2 gap-2">
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
											BI
										</label>
										<input
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
											onChange={(event) =>
												setCreateUser({ ...newUser, birthday: event.target.value })
											}
											type={"date"}
											className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
										/>
									</div>
								</div>
								<div className="mt-2 grid grid-cols-2 gap-2">
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
											E-mail
										</label>
										<input
											onChange={(event) =>
												setCreateUser({ ...newUser, email: event.target.value })
											}
											type={"email"}
											className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
										/>
									</div>
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
											Senha
										</label>
										<input
											onChange={(event) =>
												setCreateUser({ ...newUser, password: event.target.value })
											}
											type={"password"}
											className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
										/>
									</div>
								</div>
								<div className="mt-2 grid grid-cols-1 gap-2">
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
											Semanas de Gravidez
										</label>
										<input
											value={paciente.weeks}
											onChange={(event) =>
												setPaciente({ ...paciente, weeks: event.target.valueAsNumber })
											}
											type={"number"}
											className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
										/>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="mt-2">
									<label
										className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
										htmlFor="LoggingEmailAddress"
									>
										E-mail
									</label>
									<input
										onChange={(event) => setUser({ ...user, email: event.target.value })}
										id="LoggingEmailAddress"
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
										type="email"
									/>
								</div>
								<div className="mt-2">
									<div className="flex justify-between">
										<label
											className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
											htmlFor="loggingPassword"
										>
											Senha
										</label>
										{change ? null : (
											<a
												onClick={handleRecovery}
												className="text-xs cursor-pointer text-gray-500 dark:text-gray-300 hover:underline"
											>
												Esqueceu Senha?
											</a>
										)}
									</div>
									<input
										onChange={(event) => setUser({ ...user, password: event.target.value })}
										id="loggingPassword"
										className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
										type="password"
									/>
								</div>
							</>
						)}

						<div className="mt-8">
							<button
								onClick={change ? () => handleCreateUser() : () => handleLogin()}
								className="flex items-center justify-center gap-2 w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
							>
								{change ? "Cadastrar" : "Entrar"}
								{!loader ? null : <ArrowCycle size={16} className="animate-spin" />}
							</button>
						</div>
						<div className="flex items-center justify-between mt-2">
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
			</div>
		</section>
	);
};

export default Login;
