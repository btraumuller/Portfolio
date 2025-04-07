import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function LoadingIcon({text}: {text: string}){
    return(
        <>
            <p className="mb-6 mt-10 text-4xl text-center">{text}</p>
            <div className="flex justify-center flex-row h-[5rem] md:h-[10rem] flex-wrap">
                
                <FontAwesomeIcon icon={faSpinner} className=" self-center text-6xl md:text-8xl" spin />
            </div>
        </>
        
    )
}