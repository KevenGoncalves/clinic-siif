import { Medico, Paciente, User } from "@prisma/client";
import { atom } from "jotai";

export const userAtom = atom<
	| (User & {
			Medico: Medico | null;
			paciente: Paciente | null;
	  })
	| null
>(null);
