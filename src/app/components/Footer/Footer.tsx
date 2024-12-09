"use-client";
export default function Footer (){
    const year = new Date().getFullYear();
    return(
        <footer>
          <div className="text-center">&copy; Copyright {year}</div>
        </footer>  
    )
}