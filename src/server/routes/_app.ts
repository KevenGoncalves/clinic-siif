import { router } from "../trpc";
import { consulaRouter } from "./consulta";
import { medicoRouter } from "./medico";
import { pacienteRouter } from "./paciente";
import { userRouter } from "./user";

export const appRouter = router({
	user: userRouter,
	paciente: pacienteRouter,
	medico: medicoRouter,
	consulta: consulaRouter,
});

export type AppRouter = typeof appRouter;
