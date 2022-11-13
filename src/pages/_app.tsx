import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { trpc } from "../lib/trpc";

const App = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default trpc.withTRPC(App);
