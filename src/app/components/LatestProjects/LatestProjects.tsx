import Image from 'next/image'
import Link from 'next/link';
import { DM_Sans } from "next/font/google";
import {getLatestProjects} from '@/app/actions/getLatestProjects';
import ImageCard from '../ImageCard/ImageCard';

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

export default async function LatestProjects(){
    const posts:latestProjectData = await getLatestProjects();
    if (posts){
      return(
        <div className="px-4 w-full mx-auto max-w-screen-xl">
            <h2 className={`${dmSans.variable} text-4xl md:text-6xl my-4 lg:my-8 text-center`}>My Latest Projects</h2>
              
            <div className="dm flex-col md:flex-row pt-8 justify-between flex">
              { posts.map((project, i) =>{
                let projectId = project.id;
                let projectLink = '/projects/' + projectId;
                return(
                    <ImageCard key={project.title} 
                      projectLink={projectLink} 
                      date={project.projectFields.projectDate.toString()} 
                      srcLink={project.projectFields.thumbnailImage.node.mediaItemUrl} 
                      altText={project.projectFields.thumbnailAltText} 
                      projectTitle={project.title} 
                      description={project.projectFields.shortDescription} />
                  )
                })
              }
            </div>
            <div className="py-4 lg:pb-8 lg:pt-14 flex justify-center">
              <Link className="primary-btn" href="/projects">View All Projects</Link>
            </div>
          </div>
      );
    }else{
      return(
        <div className="px-4 w-full mx-auto max-w-screen-xl">
          <h2 className={`${dmSans.variable} text-6xl my-4 lg:my-8 text-center`}>My Latest Projects</h2>
          <p className='text-center py-4'>There are no projects to display at the moment.</p>
        </div>
      )
    }
    
}