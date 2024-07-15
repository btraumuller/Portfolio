"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchFields(){
    const searchParam = useSearchParams();
    const {replace} = useRouter();
    const pathname = usePathname();

    const searchHandler = (searchTerm:string) =>{
        let params = new URLSearchParams(searchParam);
        if (searchTerm){
            params.set('searchQuery', searchTerm);
        }else{
            params.delete('searchQuery');
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return(
        <div className="flex p-4 rounded border-black">
            <div className="flex p-4 rounded border-black">
                <form action="#" id="search-projects-form">>
                    <label for="search-projects">Search:</label>
                    <input 
                        id="search-projects"
                        name="search-projects"
                        input type="text"
                        placeholder="search by name"
                        defaultValue={searchParam.get('searchQuery')?.toString()}
                        onChange={(e) => searchHandler(e.target.value)}
                    />
                </form>
            </div>
        </div>
        )
}
