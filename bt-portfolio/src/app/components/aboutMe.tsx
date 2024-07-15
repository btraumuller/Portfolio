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
            <div className="rounded-[50%] z-10 overflow-hidden mb-8 lg:mb-0 lg:mr-[4rem] profile-border w-full  max-w-[500px] lg:max-w-[500px] lg:animate-aboutImage">
              <img src={props.aboutProp.aboutMe.imageSrc} alt={props.aboutProp.aboutMe.altText}  />
            </div>
            <div className="self-center z-0 lg:animate-aboutDescription w-full lg:max-w-[500px]">
              <h2 className="text-4xl mb-4">{props.aboutProp.aboutMe.headline}</h2>
              <p>{props.aboutProp.aboutMe.description}</p>
            </div>
        </div>
    )
}