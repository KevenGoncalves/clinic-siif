import { z } from "zod";
import { prisma } from "../../lib/prisma-client";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
	all: publicProcedure.query(async () => {
		return await prisma.user.findMany();
	}),
	byId: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ input }) => {
			return await prisma.user.findFirst({
				where: {
					id: input.id,
				},
			});
		}),
	byEmail: publicProcedure
		.input(
			z.object({
				email: z.string().email().nullish(),
			})
		)
		.query(async ({ input }) => {
			return await prisma.user.findFirst({
				where: { email: input.email! },
				include: {
					Medico: true,
					paciente: true,
				},
			});
		}),
	create: publicProcedure
		.input(
			z.object({
				firstName: z.string(),
				lastName: z.string(),
				email: z.string().email().min(1),
				password: z.string().nullable(),
				birthday: z.string(),
				bi: z.string(),
				role: z.any().default("PACIENTE"),
			})
		)
		.mutation(async ({ input }) => {
			const { bi, birthday, email, firstName, lastName, role } = input;
			return await prisma.user.create({
				data: { bi, birthday, email, firstName, lastName, role },
			});
		}),
	delete: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return await prisma.user.delete({
				where: { id: input.id },
			});
		}),
	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				firstName: z.string(),
				lastName: z.string(),
				email: z.string().email().min(1),
				password: z.string().nullable(),
				birthday: z.string(),
				bi: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const { bi, birthday, email, firstName, lastName, id } = input;
			return await prisma.user.update({
				where: { id: id },
				data: { bi, birthday, email, firstName, lastName, role: "PACIENTE" },
			});
		}),
});
