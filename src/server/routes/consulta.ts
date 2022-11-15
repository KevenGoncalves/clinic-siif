import { router } from "../trpc";
import { publicProcedure } from "../trpc";
import { prisma } from "../../lib/prisma-client";
import { z } from "zod";

export const consulaRouter = router({
	all: publicProcedure.query(async () => {
		return await prisma.consulta.findMany({
			include: {
				medico: true,
				paciente: true,
			},
		});
	}),
	allByPacienteId: publicProcedure
		.input(
			z.object({
				pacienteId: z.string(),
			})
		)
		.query(async ({ input }) => {
			return await prisma.consulta.findMany({
				where: {
					pacienteId: input.pacienteId,
				},
				include: {
					medico: true,
					paciente: true,
				},
			});
		}),
	allByMedicoId: publicProcedure
		.input(
			z.object({
				medicoId: z.string(),
			})
		)
		.query(async ({ input }) => {
			return await prisma.consulta.findMany({
				where: {
					medicoId: input.medicoId,
				},
				include: {
					medico: true,
					paciente: true,
				},
			});
		}),
	create: publicProcedure
		.input(
			z.object({
				medicoId: z.string(),
				pacienteId: z.string(),
				date: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return await prisma.consulta.create({
				data: { ...input, consultaState: "PENDENTE" } as any,
			});
		}),
	delete: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return await prisma.consulta.delete({
				where: { id: input.id },
			});
		}),
	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				medicoId: z.string(),
				pacienteId: z.string(),
				date: z.string(),
				exams: z.string().optional(),
				observations: z.string().optional(),
				consultaState: z.any(),
			})
		)
		.mutation(async ({ input }) => {
			return await prisma.consulta.update({
				where: { id: input.id },
				data: input as any,
			});
		}),
});
