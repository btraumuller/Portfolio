type bannerData = {
    bannerProp:{
        headline: string,
        tagLoop: number,
        tags: {
            name: string
        }[]
    }
}
export default function bannerComponent(props:bannerData){
    return(
        <div className="flex shrink-0 flex-col relative px-0 overflow-hidden">
            {[...Array(props.bannerProp.tagLoop)].map((i, index) =>{
                    let indexNumber;
                    if (index % 2 === 0){
                        indexNumber = 'normal'
                    }
                    else{
                        indexNumber = 'reverse'
                    }
                    return(
                        <>
                        </>
                        // <div style={{'--duration':'70951ms', '--direction':`${indexNumber}`}} key={i}>
                        //     <div className="flex w-fit animate-loop" >
                        //         {props.bannerProp.tags.map((tag)=>{
                        //             return(
                        //                 <div className="mx-1 my-1 text-white flex-nowrap flex w-auto whitespace-nowrap text-[8rem] leading-[7rem] lg:text-[12rem] lg:leading-[11rem]" key={tag.name}>{tag.name}</div>
                        //                 )
                        //             })          
                        //         }
                        //     </div>
                        // </div>
                    )
                    
                }) 
            }
            <div className="w-full h-full bg-black absolute opacity-[.65] z-0 animatedBackgroundFade"></div>
            <div className=" m-4 absolute top-[50%] ml-[50%] translate-y-[-50%] translate-x-[-50%] text-center text-white">
                <h1 className="text-5xl lg:text-9xl leading-[4rem] lg:leading-[10rem]">{props.bannerProp.headline}</h1>
            </div>
        </div> 
    )
        
}

