import { router } from "../trpc";
import { medicoRouter } from "./medico";
import { pacienteRouter } from "./paciente";
import { userRouter } from "./user";

export const appRouter = router({
	user: userRouter,
	paciente: pacienteRouter,
	medico: medicoRouter,
});

export type AppRouter = typeof appRouter;
