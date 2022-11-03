import { Heart } from "akar-icons";
import Link from "next/link";

const HomeNavbar = () => {
	return (
		<div className="bg-blue-600 text-white">
			<div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
				<div className="relative flex items-center justify-between">
					<a href="/" aria-label="Company" title="Company" className="inline-flex items-center">
						<Heart size={36} strokeWidth={2} />

						<span className="ml-2 text-xl font-bold tracking-wide  uppercase">Consultas Pré-Natais</span>
					</a>
					<ul className="flex items-center space-x-8 lg:flex -ml-36">
						<li>
							<a
								href="/"
								aria-label="Our product"
								title="Our product"
								className="font-medium tracking-wide  transition-colors duration-200 hover:border-b-2 "
							>
								Product
							</a>
						</li>
						<li>
							<a
								href="/"
								aria-label="Our product"
								title="Our product"
								className="font-medium tracking-wide  transition-colors duration-200 hover:border-b-2 "
							>
								Features
							</a>
						</li>
						<li>
							<a
								href="/"
								aria-label="Product pricing"
								title="Product pricing"
								className="font-medium tracking-wide  transition-colors duration-200 hover:border-b-2 "
							>
								Pricing
							</a>
						</li>
						<li>
							<a
								href="/"
								aria-label="About us"
								title="About us"
								className="font-medium tracking-wide  transition-colors duration-200 hover:border-b-2 "
							>
								About us
							</a>
						</li>
					</ul>
					<ul className="flex items-center space-x-8 lg:flex">
						<li>
							<Link
								href="/login"
								className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-blue-600 transition duration-200 rounded shadow-md bg-white hover:bg-zinc-50 focus:shadow-outline focus:outline-none"
								aria-label="Sign up"
								title="Sign up"
							>
								Entrar
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default HomeNavbar;
