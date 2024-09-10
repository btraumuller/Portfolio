import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {notFound} from "next/navigation";
import { getProjectDetail } from "@/app/api/getProjectDetail";

type projectDetailData = {
    title: string
    projectFields:{
      projectDate: Date,
      desktopImageAltText: string,
      longDescription: string,
      externalLink: string,
      desktopImage:{
        node:{
          mediaItemUrl: string
        }
      }
    } 
};

export default async function projectDetail({params}:{
    params:{
        projectId: string
    }
}){
    let projectDetail:projectDetailData = await getProjectDetail(params.projectId);
    let datePosted = new Date(projectDetail.projectFields.projectDate).toLocaleDateString('default', {day:'numeric', month:'long', year:'numeric'})
    let editorContent = {__html: projectDetail.projectFields.longDescription};
    if(projectDetail){
        return(
            <main>
                <div className="max-w-screen-xl mx-auto flex flex-col pt-20 px-4">
                    <div className="py-4">
                        <Link className="flex-sm flex" href="/projects">
                            <FontAwesomeIcon icon={faChevronLeft} className="self-center mr-2 text-l" />Back to Projects
                        </Link>
                    </div>
                    <h1 className="text-center text-2xl lg:text-5xl mb-8">{projectDetail.title}</h1>
                    <Image className="detail-image" 
                        src={projectDetail.projectFields.desktopImage.node.mediaItemUrl} 
                        width={800} 
                        height={800} 
                        alt={projectDetail.projectFields.desktopImageAltText}/>
                        
                    <div className="py-8">
                        <p className="py-4 text-lg lg:text-xl"><b>Created:</b> {datePosted}</p>
                        <div className="py-4 text-lg lg:text-xl" dangerouslySetInnerHTML={editorContent} />
                    </div>
                    {  projectDetail.projectFields.externalLink &&
                        <div className="pb-10">
                            <Link className="primary-btn" href={projectDetail.projectFields.externalLink} target="_blank"><FontAwesomeIcon icon={faGithub} className=" self-center mr-2 text-2xl" />View on Github</Link>
                        </div>
                    }  
                </div>
            </main>
            
        ) 
    }else{
        return notFound();
    }
    
}