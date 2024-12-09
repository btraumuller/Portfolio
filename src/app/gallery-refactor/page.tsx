import { Suspense } from "react";
import Link from "next/link";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageGallery from "../components/ImageGallery/ImageGallery";

export default function GalleryRefactor(){
    return(
        <main>
            <div className="max-w-screen-xl mx-auto flex flex-col px-4 pt-[8rem]">
                <Link className="flex-sm flex" href="/projects/cG9zdDoyNg=="><FontAwesomeIcon icon={faChevronLeft} className="self-center mr-2 text-l" />Back to Project Detail</Link>
                <Suspense fallback={"...loading"}>
                    <ImageGallery />
                </Suspense>
            </div>
        </main>
    )
}