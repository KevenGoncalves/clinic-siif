import Cta from "../components/home/cta";
import Features from "../components/home/features";
import Footer from "../components/home/footer";
import Hero from "../components/home/hero";
import HomeNavbar from "../components/home/navbar";
import ScrollTop from "../components/home/scroll-top";
import { trpc } from "../lib/trpc";

export default function Home() {
	return (
		<>
			<HomeNavbar />
			<Hero />
			<Features />
			<Cta />
			<Footer />
			<ScrollTop />
		</>
	);
}
