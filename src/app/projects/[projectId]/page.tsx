import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import {notFound} from "next/navigation";
const prisma = new PrismaClient();
type projectDetail = {
    project_id: Decimal,
    project_name: string,
    project_date: Date,
    imageSrc: string,
    image_altText: string | null,
    thumbnail_imageSrc: string,
    thumbnail_altText: string,
    description_short: string,
    descripition_long:string
}[] | undefined;

export async function getProjectDetail(projectId:string){
    let projectDetail = await prisma.projects.findUnique({
        where:{
            project_id: projectId
        }
    });
    if (!projectDetail){
        return notFound();
    }
    return projectDetail;
}
export default async function projectDetail({params}:{
    params:{
        projectId: string
    }
}){
    let projectDetail = await getProjectDetail(params.projectId);
    if(!projectDetail){
        return null;
    }else{
        return <div className="max-w-screen-xl mx-auto flex flex-col p-4">
            <div className="py-4"><Link className="flex-sm" href="/projects">Projects</Link></div>
            <Image className="mx-auto" src={projectDetail.imageSrc} width={400} height={400} alt={projectDetail.image_altText}/>
            <div className="py-8">
                <h1 className="text-center text-2xl lg:text-5xl">{projectDetail.project_name}</h1>
                <p className="py-4 text-lg lg:text-2xl">{projectDetail.description_short}</p>
            </div>
        </div>
    }
    
}