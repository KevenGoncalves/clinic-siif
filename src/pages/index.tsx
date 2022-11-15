import Head from "next/head";
import Cta from "../components/home/cta";
import Features from "../components/home/features";
import Footer from "../components/home/footer";
import Hero from "../components/home/hero";
import HomeNavbar from "../components/home/navbar";
import ScrollTop from "../components/home/scroll-top";

export default function Home() {
	return (
		<>
			<Head>
				<title>Sistema Consulta Pré Natais</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<HomeNavbar />
			<Hero />
			<Features />
			<Cta />
			<Footer />
			<ScrollTop />
		</>
	);
}
