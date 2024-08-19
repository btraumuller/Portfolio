import Link from "next/link";
import Image from "next/image";
type ProjectListData = {
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
    
}[];
export async function getprojectList(query:string){

    const projects = await fetch('http://btraumullerportfoliocom.local/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},  
        body: JSON.stringify({
          query: `query projectList {
            projects(where: {search: "${query}"}) {
              nodes {
                projectFields {
                  projectDate
                  shortDescription
                  thumbnailAltText
                  thumbnailImage {
                    node {
                      mediaItemUrl
                    }
                  }
                }
                title
                id
              }
            }
          }
        `})
    });
  
    let json = await projects.json();
    let projectData = {
        props: {
            projects: json.data.projects.nodes
        }
    }
    return projectData.props.projects;
}
export default async function projectList({query}:{query:string}){
    let projects:ProjectListData = await getprojectList(query);
    if (!projects || projects.length === 0){
        return(
            <div><p>No projects found</p></div>
        ) 
    }else{
        return(
            <div className="dm flex flex-col md:flex-row pt-8 flex flex-wrap list-column">
                 {projects.map((project, i) =>{
                    let datePosted = new Date(project.projectFields.projectDate).toLocaleDateString('default', {day:'numeric', month:'long', year:'numeric'})
                    let projectId = project.id;
                    let projectLink = '/projects/' + projectId;
                    return(
                        <Link href={projectLink} className="cursor-pointer relative mb-8 hover:relative hover:top-[-20px] project-card md:w-[30%] max-w-[400px] latest-projects-border" key={i}>
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
           
        )
    }
    
}
