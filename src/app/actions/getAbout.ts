export async function getAbout(){
    const wpGraphqlUrl = process.env.WP_GRAPHQL_URL;

    if (!wpGraphqlUrl) {
        throw new Error('WP_GRAPHQL_URL environment variable is not defined');
    }
    
    try{
  
    const aboutUs = await fetch(wpGraphqlUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},  
        body: JSON.stringify({
          query: `query getBio {
            bios {
                nodes {
                    bioFields {
                        description
                        headline
                        link {
                            target
                            title
                            url
                        }
                        link2 {
                            target
                            title
                            url
                        }
                        profileImage {
                            node {
                                altText
                                mediaItemUrl
                            }
                        }
                    }
                }
            }
        }
        `})
      });
  
      let json = await aboutUs.json();
      
      let bioData = {
        props: {
          bio: json.data.bios.nodes[0].bioFields
        }
      }
      return bioData.props.bio;
  
    }catch{
      console.log('Hey there is an error with the About Us API call');
      return null;
    }
  }