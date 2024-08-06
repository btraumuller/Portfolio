import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type aboutData = {
    aboutProp:{
        aboutMe:{
            imageSrc: string,
            altText: string,
            headline: string,
            description: string,
        }
    }
}
export default function aboutMe (props: aboutData){
    return(
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row px-4 lg:px-0">
            <div className="self-center lg:self-auto rounded-[50%] z-10 overflow-hidden mb-8 lg:mb-0 lg:mr-[4rem] profile-border w-full  max-w-[300px] lg:max-w-[500px] lg:animate-aboutImage">
              <Image className="w-full h-auto" src={props.aboutProp.aboutMe.imageSrc} height="400" width="400" alt={props.aboutProp.aboutMe.altText}  />
            </div>
            <div className="self-center z-0 lg:animate-aboutDescription w-full lg:max-w-[500px]">
              <h2 className="text-center lg:text-left text-4xl mb-4">{props.aboutProp.aboutMe.headline}</h2>
              <p className="mb-8">{props.aboutProp.aboutMe.description}</p>
                <div className="flex py=4">
                    <Link className="primary-btn text-center" href="/files/BrianTraumuller_Resume_2024.pdf">Download my Resume</Link>
                    <Link className="ml-8 self-center flex" href="https://github.com/btraumuller" target="_blank"><FontAwesomeIcon icon={faGithub} className=" self-center mr-2 text-2xl" /> See my Github</Link>
                </div>
            </div>
        </div>
    )
}