import { supabase } from "../lib/supabase-client";
import { CreateType, UserType } from "../pages/login";

export const login = async (user: UserType) => {
	return await supabase.auth.signInWithPassword(user);
};

export const createUser = async (user: CreateType) => {
	return await supabase.auth.signUp(user);
};

export const logout = async () => {
	return await supabase.auth.signOut();
};

export const recovery = async (user: UserType) => {
	return await supabase.auth.resetPasswordForEmail(user.email);
};
