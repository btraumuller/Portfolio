import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { getAbout } from "@/app/api/getAbout";

type aboutDataType = {
    description: string,
    headline: string,
    link:{
        target: string,
        title: string,
        url: string
    },
    link2:{
        target: string,
        title: string,
        url: string
    },
    profileImage:{
        node:{
            altText: string,
            mediaItemUrl: string
        }
    }
}

export default async function aboutMe (){
    let aboutMeData:aboutDataType = await getAbout();
    if (aboutMeData){
        return(
            <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row px-4 lg:px-0">
                <div className="self-center lg:self-auto rounded-[50%] z-10 overflow-hidden mb-8 lg:mb-0 lg:mr-[4rem] profile-border w-full  max-w-[300px] lg:max-w-[500px] lg:animate-aboutImage">
                  <Image className="w-full h-auto" src={aboutMeData.profileImage.node.mediaItemUrl} height="400" width="400" alt={aboutMeData.profileImage.node.altText}  />
                </div>
                <div className="self-center z-0 lg:animate-aboutDescription w-full lg:max-w-[500px]">
                  <h2 className="text-center lg:text-left text-4xl mb-4">{aboutMeData.headline}</h2>
                  <p className="mb-8">{aboutMeData.description}</p>
                    <div className="flex py=4">
                        <Link className="primary-btn text-center" href={aboutMeData.link.url}>{aboutMeData.link.title}</Link>
                        <Link className="ml-8 self-center flex" href={aboutMeData.link2.url} target="_blank"><FontAwesomeIcon icon={faGithub} className=" self-center mr-2 text-2xl" />{aboutMeData.link2.title}</Link>
                    </div>
                </div>
            </div>
        )
    }else{
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row px-4 lg:px-0">
            <h3>About Me Information is unavailable at the moment</h3>
        </div>
    }
    
}