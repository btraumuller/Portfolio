export async function getLatestProjects(){

    const wpGraphqlUrl = process.env.WP_GRAPHQL_URL;
  
      if (!wpGraphqlUrl) {
          throw new Error('WP_GRAPHQL_URL environment variable is not defined');
      }
    try{
  
    const projects = await fetch(wpGraphqlUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},  
        body: JSON.stringify({
          query: `query recentProjects {
            projects(first: 3, where: {orderby: {field: DATE, order: DESC}, dateQuery: {}}) {
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
  
    }catch{
      console.log('hey there is an error on latest projects API call');
      return null;
    }
  }