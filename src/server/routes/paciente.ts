import { z } from "zod";
import { prisma } from "../../lib/prisma-client";
import { publicProcedure, router } from "../trpc";

export const pacienteRouter = router({
	all: publicProcedure.query(async () => {
		return await prisma.paciente.findMany({
			include: {
				Consulta: true,
				user: true,
			},
		});
	}),
	byUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			return await prisma.paciente.findUnique({
				where: {
					userId: input.userId,
				},
				include: {
					user: true,
					Consulta: true,
				},
			});
		}),
	create: publicProcedure
		.input(
			z.object({
				weeks: z.number(),
				state: z.boolean(),
				userId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return await prisma.paciente.create({
				data: input,
			});
		}),
	delete: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return await prisma.paciente.delete({
				where: { userId: input.userId },
			});
		}),
	update: publicProcedure
		.input(
			z.object({
				weeks: z.number(),
				state: z.boolean(),
				userId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return await prisma.paciente.update({
				where: { userId: input.userId },
				data: input,
			});
		}),
});
