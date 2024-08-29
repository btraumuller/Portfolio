import LatestProjects from './components/latest-projects';
import AboutMe from "./components/aboutMe";
import Ticker from "./components/imageTicker/imageTicker";
import ParallaxBanner from "./components/parralaxBanner/parallaxBanner";

// Mock Data for CSS Headline (Want to implement at future date)

// const siteData = {
//     headline: 'Welcome to Brian Traumullers Website',
//     tagLoop: 3,
//     tags: [
//        {
//         name:'<Web /><Javascript /><CSS /><HTML /><React /><Front-end /><Web /><Javascript /><CSS /><HTML /><React /><Front-end />',
//         id: 0,
//        }
//     ],
// }

export default function Home() {
  return (
    <>
    <section id="intro-banner" className="w-full">
          <ParallaxBanner />
    </section>
    <main className="flex min-h-screen flex-col items-center w-full relative z-[1]">
        <section id="latest-projects" className="py-8">
          <LatestProjects/>
        </section>
        <section id="about-me" className="py-8">
          <AboutMe />
        </section>
        <section id="ticker" className="py-8">
          <Ticker />
        </section>
    </main>
    </>
  );
}
