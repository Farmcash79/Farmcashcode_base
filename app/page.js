import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Marketplace from './components/Marketplace';
import Business from './components/Business';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import AppDownload from './components/AppDownload';
import Footer from './components/Footer';

export default function Home() {
	return (
		<>
			<Navbar /> 
			<Hero />
	<main>
			<Stats />
		    <Features />
			<HowItWorks />
			<Marketplace />
			<Business />
			<Testimonials />
			<FAQ />
			<AppDownload />
				
</main> 
			<Footer />  
                     </>
	);
}

