"use client";
import Image from "next/image";

type galleryListData = {
    isLoading:boolean,
    hideList:boolean,
    showLoadMore:boolean,
    isNoResults:boolean,
    hoverLabel:string,
    noResults:string,
    loadMoreLabel:string,
    loadMoreAction:() => void,
    projectContent:{
        Link:string,
        ImageSrc:string,
        Name:string
    }[],
}

export default function GalleryListings(props:galleryListData){
    return(
        <div className="tab-content-container">
                { props.isLoading &&
                    <p className="is-loading">Your Images are loading</p>
                }
                {//props.hideList &&
                    <ul className="project-gallery__grid">
                        { 
                            props.projectContent.map((project, i) => 
                                <li key={i}>
                                    <a href={project.Link} target="_blank" tabIndex={0}>
                                        <span className="image-label"><span>{props.hoverLabel}</span></span>
                                        <Image src={project.ImageSrc} alt={project.Name} width={400} height={400} loading="lazy" />
                                    </a>
                                </li>
                            )
                        }
                    </ul>
                }
                { props.showLoadMore &&
                    <div className="project-gallery__load-more-container"><button onClick={props.loadMoreAction}>{props.loadMoreLabel}</button></div>
                }
                { props.isNoResults &&
                    <p className="no-more-results">{props.noResults}</p>
                }
            </div>
        
    )
}