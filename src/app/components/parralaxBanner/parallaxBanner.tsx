
import styles from "./scss/parallax-banner.module.scss";
import { getImageProps } from "next/image";
import { getParallaxBanner } from "@/app/api/getParallaxBanner";

type bannerDataType = {
    headline: string,
    description: string,
    desktopImage: {node: {altText: string, mediaItemUrl: string}},
    mobileImage: {node: {altText: string, mediaItemUrl: string}},
    tabletImage: {node: {altText: string, mediaItemUrl: string}}
}

const common = {sizes: '100vw' }

export default async function parallaxBanner() {
    const bannerData: bannerDataType = await getParallaxBanner();
    if (bannerData){
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
    }else{
        <div className={styles.parallax}>
            <p className='text-center py-4'>Sorry this Banner cannot be displayed at the moment</p>
        </div>
    }
   
}