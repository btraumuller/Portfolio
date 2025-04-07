import Link from "next/link";
import Image from "next/image";

interface ImageCardProps {
  projectLink: string;
  date: string;
  srcLink: string;
  altText: string;
  projectTitle: string;
  description: string;
}

export default function ImageCard({
  projectLink,
  date,
  srcLink,
  altText,
  projectTitle,
  description,
}: ImageCardProps) {
    let datePosted = new Date(date).toLocaleDateString('default', {day:'numeric', month:'long', year:'numeric'})
    return(
        <>
        <Link href={projectLink} className="cursor-pointer relative mb-8 hover:relative hover:top-[-20px] project-card md:w-[30%] max-w-[400px] latest-projects-border">
          <Image src={srcLink} width={400} height={400} alt={altText} />
          <div className="p-4 bg-white h-full border border-t-black">
            <p className='text-black mb-0 py-2'>{datePosted}</p>
            <h3 className='text-2xl text-black mb-2'>{projectTitle}</h3>
            <p className='text-black py-2'>{description}</p>
          </div>
        </Link>
        </>
      )
}