import ImageGallery from "../components/imageGallery/imageGallery"
import Link from "next/link";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function galleryRefactor(){
    return(
        <main>
            <div className="max-w-screen-xl mx-auto flex flex-col px-4 pt-[8rem]">
                <Link className="flex-sm flex" href="/projects/cG9zdDoyNg=="><FontAwesomeIcon icon={faChevronLeft} className="self-center mr-2 text-l" />Back to Project Detail</Link>
                <ImageGallery />
            </div>
        </main>
    )
}