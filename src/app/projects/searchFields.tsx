"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchFields(){
    const searchParam = useSearchParams();
    const {replace} = useRouter();
    const pathname = usePathname();

    const searchHandler = (searchTerm:string) =>{
        let params = new URLSearchParams(searchParam);
        if (searchTerm){
            params.set('searchQuery', encodeURI(searchTerm));
        }else{
            params.delete('searchQuery');
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="flex rounded border-black py-8 relative">
            <label className="sr-only" htmlFor="project-search">Search:</label>
            <input
                id="project-search"
                name="project-search"
                placeholder="Search by name"
                defaultValue={searchParam.get('searchQuery')?.toString()}
                className="w-full rounded p-4"
                onChange={(e) => searchHandler(e.target.value)}
            />
        </div>
    );
}