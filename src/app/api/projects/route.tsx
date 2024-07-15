import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getLatestProjects(){
    const projects = await prisma.projects.findMany();
    return projects;
}