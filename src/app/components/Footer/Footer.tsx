"use-client";
import { getYear } from 'date-fns';

export default function Footer (){
    const year = getYear(new Date());
    return(
        <footer>
          <div className="text-center">&copy; Copyright {year}</div>
        </footer>  
    )
}