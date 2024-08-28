import LatestProjects from './components/latest-projects';
import AboutMe from "./components/aboutMe";
import Ticker from "./components/imageTicker/imageTicker";
import ParallaxBanner from "./components/parralaxBanner/parallaxBanner";


const siteData = {
    headline: 'Welcome to Brian Traumullers Website',
    tagLoop: 3,
    tags: [
       {
        name:'<Web /><Javascript /><CSS /><HTML /><React /><Front-end /><Web /><Javascript /><CSS /><HTML /><React /><Front-end />',
        id: 0,
       }
    ],
    aboutMe:{
        imageSrc:'/img/profile_pic.jpg',
        altText:'Brian Traumuller Profile Picture',
        headline: 'About Me',
        description:"I am a front-end developer with over 13 years of experience in the web industry. Over those years, I had the opportunity to work on projects that featured many of today's coding languages like javascript, vue, react, and Next.js. Not only do I pride myself on learning these new technologies, but I also make sure that these technologies are used in a way that both meet and exceed my client's expecations.",

    }
}
export default async function Home() {
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
          <AboutMe aboutProp={siteData} />
        </section>
        <section id="ticker" className="py-8">
          <Ticker />
        </section>
        {/* <section id="latest-projects" className="py-8 lg:pb-[10rem] lg:pt-8">
          <ContactUs />
        </section> */}
    </main>
    </>
  );
}
