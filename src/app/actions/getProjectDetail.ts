import {notFound} from "next/navigation";

export async function getProjectDetail(projectId:string){

    const wpGraphqlUrl = process.env.WP_GRAPHQL_URL;

    if (!wpGraphqlUrl) {
        throw new Error('WP_GRAPHQL_URL environment variable is not defined');
    }

    if (projectId.includes("%3D")){
        projectId = projectId.replace(/%3D/g, "=");
    }


    try{
        const projectDetail = await fetch(wpGraphqlUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},  
            body: JSON.stringify({
              query: `query getProject {
                projects(where: {in: "${projectId}"}) {
                    nodes {
                        title
                        projectFields {
                            projectDate
                            longDescription
                            desktopImageAltText
                            externalLink
                            desktopImage {
                                node {
                                    mediaItemUrl
                                }
                            }
                        }
                        
                    }
                }             
              }
            `})
          });
      
          let json = await projectDetail.json();
          let projectData = {
            props: {
              projects: json.data.projects.nodes[0]
            }
          }
          
        if (!projectDetail){
            return notFound();
        }

        return projectData.props.projects;
    }catch{
        console.log('There is an error retrieving this Data');
        return null;
    }
    
}
