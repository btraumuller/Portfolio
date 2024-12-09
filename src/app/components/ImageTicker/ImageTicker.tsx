import './scss/imageTicker.module.scss';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
type ImageTickerType = {
    title: string,
    images: {
        src: string,
        alt: string
    }[]
    linkLabel: string,
    link: string
}
const mockData:ImageTickerType = {
    title: 'This site was made using the following tech stack:',
    images: [
        {src: '/img/imageTicker/react-logo.svg', alt: 'React Logo'},
        {src: '/img/imageTicker/nextjs-logo.svg', alt: 'Next.js Logo'},
        {src: '/img/imageTicker/graphql-logo.svg', alt: 'GraphQL Logo'},
        {src:'/img/imageTicker/wordpress-logo.svg', alt: 'WordPress Logo'},
    ],
    linkLabel: 'View on Github',
    link: 'https://github.com/btraumuller/Portfolio'
};
export default function imageTicker(){
    return(
    <div className="max-w-screen-xl mx-auto w-full flex flex-col flex-wrap px-4 lg:px-0 justify-center">
        <h2 className="text-4xl my-4 lg:my-[4rem] text-center">{mockData.title}</h2>
        <div className="slider">
            <div className='slide-track flex-col lg:flex-row w-full'>
                {mockData.images.map((image, i)=>{
                    return(
                            <div className="slide mb-8 lg:mb-0 mx-[4rem]" key={i}>
                                <Image  src={image.src} alt={image.alt} width="300" height="300" className="" />
                            </div>
                        )
                    })          
                }
            </div>
        </div>
        <div className="pt-[5rem] flex justify-center">
            <Link href={mockData.link} target="_blank" className="primary-btn"><FontAwesomeIcon icon={faGithub} className="self-center mr-2 text-2xl" />{mockData.linkLabel}</Link>
        </div>
    </div>  
  )
}