import SearchFields from './searchFields';
import ProjectList from './projectList';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default async function projectList({searchParams}:{
    searchParams?:{
        searchQuery?: string
    }
}){
    const searchQuery = searchParams?.searchQuery || "";
    return(
        <div>
            <div className='relative overflow-hidden'>
                <Image width="400" height="400" src="https://placehold.co/1200x340" className='w-full absolute top-0 z-1' alt="search background-image" />
                <div className='max-w-screen-xl mx-auto flex flex-col p-4 z-10 mt-8 mb-8 relative'>
                    <h1 className='text-center'>My Portfolio</h1>
                    <p className='text-center'>Below are some of the projects that I have worked on in both a professional and personal setting.</p>
                </div>
            </div>
            <div className='max-w-screen-xl mx-auto flex flex-col p-4 z-10'>
                <Link href='/'><FontAwesomeIcon icon={faHouse} className=" self-center mr-2 text-1xl" />Home</Link>
                <SearchFields />
                <ProjectList query={searchQuery} />
            </div>
        </div>
    ) 
    
}