import Image from 'next/image'
import Link from 'next/link';
import { DM_Sans } from "next/font/google";
import {getLatestProjects} from '@/app/api/getLatestProjects';

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  variable: "--font-dm-sans",
  display: "swap", 
})

type latestProjectData = {
    projectFields:{
      projectDate: Date,
      thumbnailAltText: string,
      shortDescription: string,
      thumbnailImage:{
        node:{
          mediaItemUrl: string
        }
      }
    }
    title: string,
    id: string
    
}[] | undefined;

export default async function latestProjects(){
    const posts:latestProjectData = await getLatestProjects();
    if (!posts){
      return(
        <div className="px-4 w-full mx-auto max-w-screen-xl">
            <h2 className={`${dmSans.variable} text-6xl my-4 lg:my-8 text-center`}>My Latest Projects</h2>
            <p className='text-center py-4'>There are no projects to display at the moment.</p>
        </div>
      );
    }else{
      return(
         <div className="px-4 w-full mx-auto max-w-screen-xl">
            <h2 className={`${dmSans.variable} text-6xl my-4 lg:my-8 text-center`}>My Latest Projects</h2>
              
            <div className="dm flex flex-col md:flex-row pt-8 justify-between flex">
              { posts.map((project, i) =>{
                let datePosted = new Date(project.projectFields.projectDate).toLocaleDateString('default', {day:'numeric', month:'long', year:'numeric'})
                let projectId = project.id;
                let projectLink = '/projects/' + projectId;
                return(
                    <Link href={projectLink} className="cursor-pointer relative mb-8 hover:relative hover:top-[-20px] md:mb-0 mx-auto project-card md:w-[30%] max-w-[400px] latest-projects-border" key={i}>
                      <Image src={project.projectFields.thumbnailImage.node.mediaItemUrl} width={400} height={400} alt={project.projectFields.thumbnailAltText}/ >
                      <div className="p-4 bg-white h-full">
                        <p className='text-black mb-4'>{datePosted}</p>
                        <h3 className='text-2xl text-black mb-2'>{project.title}</h3>
                        <p className='text-black'>{project.projectFields.shortDescription}</p>
                      </div>
                    </Link>
                )
              })
              }
            </div>
            <div className="py-4 lg:pb-8 lg:pt-14 flex justify-center">
              <Link className="primary-btn" href="/projects">View All Projects</Link>
            </div>
          </div>
    )
    }
    
}