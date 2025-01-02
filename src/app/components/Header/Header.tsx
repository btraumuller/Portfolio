'use client';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';
export default function Header(){

    const pathName = usePathname();
    const isProjectDetail = pathName.includes('projects/');

    return(
        <header className={`w-full top-0 z-20 ${ isProjectDetail ? 'blue':'animate-header'}`}>
            <div className="max-w-screen-xl mx-auto flex p-4">
                <div className="logo mr-auto self-center">
                    <Link href="/">
                        <FontAwesomeIcon icon={faHouse} className="text-2xl self-center text-white"  />
                    </Link>
                </div>
                <nav className="py-2">
                    <Link href="/projects" className="p-4 text-white">Portfolio</Link>
                    <Link href="/files/BrianTraumuller_Resume_2024.pdf" className="p-4 text-white">Resume</Link>
                </nav>
            </div>
        </header>
    )
}