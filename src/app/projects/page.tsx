import SearchFields from './searchFields';
import ProjectList from './projectList';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { getImageProps } from 'next/image';
export default async function projectList({searchParams}:{
    searchParams?:{
        searchQuery?: string
    }
}){
    const searchQuery = searchParams?.searchQuery || "";
    const common = { alt: 'Art Direction Example', sizes: '100vw' }
    const {
        props: { srcSet: desktop },
    } = getImageProps({
        ...common,
        width: 1500,
        height: 500,
        quality: 80,
        src: '/img/portfolio-desktop.jpg',
    })
    const {
        props: { srcSet: mobile, ...rest },
    } = getImageProps({
        ...common,
        width: 768,
        height: 440,
        quality: 70,
        src: '/img/portfolio-mobile.jpg',
    })
    return(
        <div>
            <div className='relative overflow-hidden max-h-[400px] lg:max-h-[1000px]'>
                <picture>
                    <source media="(min-width: 1000px)" srcSet={desktop} />
                    <source media="(min-width: 320px)" srcSet={mobile} />
                    <Image {...rest} className='w-full min-h-[400px] absolute top-0 z-0 object-cover' alt={common.alt} />
                </picture>
                <div className="w-full h-full bg-black absolute opacity-[.5] z-0"></div>
                <div className='max-w-screen-xl mx-auto flex flex-col p-[8vw] z-10 top-[50%] relative'>
                    <h1 className='text-center text-white text-4xl'>My Portfolio</h1>
                    <p className='text-center mt-4 text-white text-xl'>View some of the projects that I have worked on in both a professional and personal setting.</p>
                </div>
            </div>
            <div className='max-w-screen-xl mx-auto flex flex-col px-4 py-8 z-10'>
                <Link href='/'><FontAwesomeIcon icon={faHouse} className=" self-center mr-2 text-1xl" />Home</Link>
                <SearchFields />
                <ProjectList query={searchQuery} />
            </div>
        </div>
    ) 
    
}