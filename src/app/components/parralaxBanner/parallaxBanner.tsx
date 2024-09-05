"use sever";
import styles from "./scss/parallax-banner.module.scss";
import { getImageProps } from "next/image";
import type { GetStaticProps } from "next";
type bannerDataType = {
    headline: string,
    description: string,
    desktopImage: {node: {altText: string, mediaItemUrl: string}},
    mobileImage: {node: {altText: string, mediaItemUrl: string}},
    tabletImage: {node: {altText: string, mediaItemUrl: string}}
}

const common = {sizes: '100vw' }

export async function GetStaticProps(){

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
            banners(where: {title: "Home Page"}) {
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
      console.log('hey there is an error on banner API call');
    }
  }

  

export default async function parallaxBanner() {
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
        <div className={styles.parallax}>
            <picture>
                <source media="(min-width: 1025px)" srcSet={desktop} />
                <source media="(min-width: 768px)" srcSet={tablet} />
                <img {...mobile} className='w-full min-h-[400px] absolute top-0 z-0 object-cover' />
            </picture>
            <div className={styles.parallax__content}>
                <h1>{bannerData.headline}</h1>
                <div className={styles.parallax__bar}></div>
                <p>{bannerData.description}</p>
            </div>
            <div className={styles.parallax__overlay}></div>
        </div>
    )
}