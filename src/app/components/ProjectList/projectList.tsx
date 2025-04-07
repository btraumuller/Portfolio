import Link from "next/link";
import Image from "next/image";
import ImageCard from "../ImageCard/ImageCard";
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
export async function getProjectList(query:string){
    const wpGraphqlUrl = process.env.WP_GRAPHQL_URL;

    if (!wpGraphqlUrl) {
        throw new Error('WP_GRAPHQL_URL environment variable is not defined');
    }

    const projects = await fetch(wpGraphqlUrl, {
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
    let projects:ProjectListData = await getProjectList(query);
    if (!projects || projects.length === 0){
        return(
            <div><p>No projects found</p></div>
        ) 
    }else{
        return(
            <div className="dm flex-col md:flex-row pt-8 flex flex-wrap list-column">
                 {projects.map((project, i) =>{
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
           
        )
    }
    
}
