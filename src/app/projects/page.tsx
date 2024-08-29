import SearchFields from './searchFields';
import ProjectList from './projectList';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { getImageProps } from 'next/image';
import type { GetStaticProps } from 'next';

type bannerDataType = {
    headline: string,
    description: string,
    desktopImage: {node: {altText: string, mediaItemUrl: string}},
    mobileImage: {node: {altText: string, mediaItemUrl: string}},
    tabletImage: {node: {altText: string, mediaItemUrl: string}}
}

const common = {sizes: '100vw' }
export async function GetStaticProps(){
    try{
  
    const banner = await fetch('http://btraumullerportfoliocom.local/graphql', {
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

export default async function projectList({searchParams}:{
    searchParams?:{
        searchQuery?: string
    }
}){
    const searchQuery = searchParams?.searchQuery || "";

    const bannerData: bannerDataType = await GetStaticProps();

    const {props: { srcSet: desktop }} = getImageProps({
        ...common,
        width: 1920,
        height: 768,
        quality: 90,
        src: bannerData.desktopImage.node.mediaItemUrl,
        alt: bannerData.desktopImage.node.altText
    })

    const {props: { srcSet: tablet }} = getImageProps({
        ...common,
        width: 1024,
        height: 1024,
        quality: 90,
        src: bannerData.tabletImage.node.mediaItemUrl,
        alt: bannerData.tabletImage.node.altText
    })

    const {props: { ...mobile}} = getImageProps({
        ...common,
        width: 800,
        height: 1200,
        quality: 90,
        src: bannerData.mobileImage.node.mediaItemUrl,
        alt: bannerData.mobileImage.node.altText
    })

    return(
        <>
            <div className='relative overflow-hidden max-h-[400px] h-[55vh] lg:max-h-[1000px]'>
                <picture>
                    <source media="(min-width: 1035px)" srcSet={desktop} />
                    <source media="(min-width: 768px)" srcSet={tablet} />
                    <img {...mobile} className='w-full min-h-[400px] absolute top-0 z-0 object-cover' />
                </picture>
                <div className="w-full h-full bg-black absolute opacity-[.5] z-0"></div>
                <div className='max-w-screen-xl mx-auto flex flex-col p-[8vw] z-10 top-[50%] -translate-y-1/2 relative'>
                    <h1 className='text-center text-white text-4xl'>{bannerData.headline}</h1>
                    <p className='text-center mt-4 text-white text-xl'>{bannerData.description}</p>
                </div>
            </div>
            <main className="flex min-h-screen flex-col w-full items-center w-full relative z-[1]">
                <div className='max-w-screen-xl mx-auto w-full flex flex-col px-4 py-8 z-10'>
                    <Link href='/'><FontAwesomeIcon icon={faHouse} className=" self-center mr-2 text-1xl" />Home</Link>
                    <SearchFields />
                    <ProjectList query={searchQuery} />
                </div>
            </main>
        </>
        
    ) 
    
}