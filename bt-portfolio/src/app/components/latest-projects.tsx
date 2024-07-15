import Image from 'next/image'

import { PrismaClient } from '@prisma/client'
import Link from 'next/link';
import { DM_Sans } from "next/font/google";
const prisma = new PrismaClient();
const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  variable: "--font-dm-sans",
  display: "swap", 
})

type latestProjectData = {
    project_id: Decimal,
    project_name: string,
    project_date: Date,
    imageSrc: string,
    image_altText: string | null,
    thumbnail_imageSrc: string,
    thumbnail_altText: string,
    description_short: string,
    descripition_long:string
}[] | undefined;

export async function getLatestprojects(){
  try{
    const projects = await prisma.projects.findMany({
      take:3,
      orderBy:{
        project_date:'desc'
      }
    }); 
    return projects;
  }catch{
    console.log('hey there is an error on latest projects');
  }
}
export default async function latestProjects(){
    const posts : latestProjectData = await getLatestprojects();
    if (!posts){
      return null;
    }else{
      return(
        <div className="w-full mx-auto max-w-screen-xl">
            <h2 className={`${dmSans.variable} text-6xl my-4 lg:my-8 text-center`}>My Latest Projects</h2>
              
            <div className="dm flex flex-col md:flex-row pt-8 justify-between flex">
              {posts.map((project, i) =>{
                let datePosted = project.project_date?.toLocaleDateString('default', {day:'numeric', month:'long', year:'numeric'})
                let projectLink = '/projects/' + project.project_id;
                return(
                    <Link href={projectLink} className="cursor-pointer relative mb-8 hover:relative hover:top-[-20px] md:mb-0 mx-auto project-card md:w-[30%] max-w-[400px] latest-projects-border" key={i}>
                      <Image src={project.thumbnail_imageSrc} width={400} height={400} alt={project.thumbnail_altText}/ >
                      <div className="p-4">
                        <p className='text-black mb-4'>{datePosted}</p>
                        <h3>{project.project_name}</h3>
                        <p className='text-black'>{project.description_short}</p>
                      </div>
                    </Link>
                )
              })
              }
            </div>
            <div className="py-8 flex justify-center">
              <Link className="p-4" href="/projects">View All Projects</Link>
            </div>
          </div>
    )
    }
    
}