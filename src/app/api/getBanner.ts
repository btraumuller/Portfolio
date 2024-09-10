export async function getBanner(){
    const wpGraphqlUrl = process.env.WP_GRAPHQL_URL;

    if (!wpGraphqlUrl) {
        throw new Error('WP_GRAPHQL_URL environment variable is not defined');
    }

    try{
  
    const banner = await fetch(wpGraphqlUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},  
        body: JSON.stringify({
          query: `query getBanner {
            banners(where: {title: "Portfolio"}) {
                nodes {
                bannerFields {
                    description
                    headline
                    desktopImage {
                    node {
                        altText
                        mediaItemUrl
                    }
                    }
                    mobileImage {
                    node {
                        altText
                        mediaItemUrl
                    }
                    }
                    tabletImage {
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
  
      let json = await banner.json();

      let bannerData = {
        props: {
          banner: json.data.banners.nodes[0].bannerFields
        }
      }
      return bannerData.props.banner;
  
    }catch{
      console.log('Hey there is an error with the Banner API call');
    }
  }