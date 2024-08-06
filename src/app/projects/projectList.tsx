import Link from "next/link";
import { PrismaClient } from '@prisma/client';
import Image from "next/image";
const prisma = new PrismaClient();
export async function getprojectList(query:string){
    const projects = await prisma.projects.findMany({
        where:{
            project_name:{
                contains:query,
            }
        }
    });
    return projects 
}
export default async function projectList({query}:{query:string}){
    const projects = await getprojectList(query);
    if (!projects || projects.length === 0){
        return(
            <div><p>No projects found</p></div>
        ) 
    }else{
        return(
            <div className="dm flex flex-col md:flex-row pt-8 justify-between flex flex-wrap">
                 {projects.map((project, i) =>{
                    let projectLink = '/projects/' + project.project_id;
                    let datePosted = project.project_date?.toLocaleDateString('default', {day:'numeric', month:'long', year:'numeric'});
                    return(
                        <Link href={projectLink} className="cursor-pointer relative mb-8 hover:relative hover:top-[-20px] project-card md:w-[30%] max-w-[400px] latest-projects-border" key={i}>
                            <Image src={project.thumbnail_imageSrc} width={400} height={400} alt={project.thumbnail_altText}/ >
                            <div className="p-4 bg-white h-full">
                            <p className='text-black mb-4'>{datePosted}</p>
                            <h3>{project.project_name}</h3>
                            <p className='text-black'>{project.description_short}</p>
                            </div>
                        </Link>
                    )
                })
            }
            </div>
           
        )
    }
    
}
