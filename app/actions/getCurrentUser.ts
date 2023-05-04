import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/app/libs/prismadb";


export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try{

        

        const session = await getSession();
        console.log(session?.user)
        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            }
        })

        if (!currentUser) {
            return null;
        }

        

        return currentUser
        // {
        //     ...currentUser,
        //     createdAt: currentUser.createdAt.toISOString(),
        //     updateAt: currentUser.updateAt.toISOString(),
        //     emailVerified: currentUser.emailVerified?.toISOString() || null,
        // };

    } catch(error: any){
        return null;
    }
}



