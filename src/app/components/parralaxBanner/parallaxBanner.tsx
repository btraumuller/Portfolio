import styles from "./scss/parallax-banner.module.scss";
import { getImageProps } from "next/image";

const common = { alt: 'Art Direction Example', sizes: '100vw' }
const {
    props: { srcSet: desktop },
} = getImageProps({
    ...common,
    width: 1920,
    height: 768,
    quality: 90,
    src: '/img/projects/banner/boston-banner.jpg',
})
const {
    props: { srcSet: tablet },
} = getImageProps({
    ...common,
    width: 1024,
    height: 1024,
    quality: 90,
    src: '/img/projects/banner/boston-banner-tablet.jpg',
})
const {
    props: { ...mobile},
} = getImageProps({
    ...common,
    width: 800,
    height: 1200,
    quality: 90,
    src: '/img/projects/banner/boston-banner-mobile.jpg',
})
export default function parallaxBanner() {
    return(
        <div className={styles.parallax}>
            <picture>
                <source media="(min-width: 1025px)" srcSet={desktop} />
                <source media="(min-width: 768px)" srcSet={tablet} />
                <img {...mobile} className='w-full min-h-[400px] absolute top-0 z-0 object-cover' />
            </picture>
            <div className={styles.parallax__content}>
                <h1>Brian Traumuller</h1>
                <div className={styles.parallax__bar}></div>
                <p>Experienced Front-end Developer in the Boston Area</p>
            </div>
            <div className={styles.parallax__overlay}></div>
        </div>
    )
}