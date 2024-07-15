import Link from 'next/link';
import SearchFields from './searchFields';
import ProjectList from './projectList';
export default async function projectList({searchParams}:{
    searchParams?:{
        searchQuery?: string
    }
}){
    const searchQuery = searchParams?.searchQuery || "";
    return(
        <div className='max-w-screen-xl mx-auto flex flex-col p-4'>
            <h1>This is the project list Page</h1>
            <p>Lorem ipsum</p>
            <SearchFields />
            <ProjectList query={searchQuery} />
        </div>
    ) 
    
}