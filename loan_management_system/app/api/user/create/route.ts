import databaseConnection from "@/app/lib/db";
import { newUser } from "@/app/types/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { success } from "zod";


export async function POST(req: NextRequest) {

    const user: newUser = await req.json();

    try {
        if (!user.staffId || !user.role) {
            NextResponse.json({
                message: "Please all fields are requires."
            }, { status: 401 })
        };

        const hashedPassword = await bcrypt.hash(user.password, 10)

        const [saveUser] = await databaseConnection.query("INSERT INTO users WHERE ()" , [user.name , user.email , user.role , hashedPassword , user.active , user.staffId]);

        if(saveUser){
            NextResponse.json({
                message : "User created successfully ." ,
                success : true ,
                data : [...saveUser]
            } , {status : 200});
        }




    } catch (error: any) {

        console.log(error);

        NextResponse.json({
            message: "Something went wrong."
        }, { status: 500 })

    }



}