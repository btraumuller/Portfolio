import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function LoadingIcon(){
    return(
        <div className="flex justify-center h-[20rem]">
            <FontAwesomeIcon icon={faSpinner} className=" self-center text-8xl" spin />
        </div>
    )
}