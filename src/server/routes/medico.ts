import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../../lib/prisma-client";

export const medicoRouter = router({
	all: publicProcedure.query(async () => {
		return await prisma.medico.findMany({
			include: { user: true, Consulta: true },
		});
	}),
	byId: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ input }) => {
			return await prisma.medico.findUnique({
				where: { id: input.id },
				include: { user: true },
			});
		}),
	byUserId: publicProcedure
		.input(
			z.object({
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			return await prisma.medico.findUnique({
				where: { userId: input.userId },
				include: { user: true, Consulta: true },
			});
		}),
	create: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				time: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return await prisma.medico.create({
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
			return await prisma.medico.delete({
				where: { userId: input.userId },
			});
		}),
	update: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				time: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return await prisma.medico.update({
				data: input,
				where: { userId: input.userId },
			});
		}),
});
