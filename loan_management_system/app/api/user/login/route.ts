import { NextRequest, NextResponse } from "next/server";
import { userId } from "@/app/types/user";
import { validateFindingUser } from "@/app/lib/validation/custom";
import databaseConnection from "@/app/lib/db";
import bcrypt from "bcrypt"


export async function POST(req: NextRequest) {

    try {
        const body = await req.json();

        const { isValid, errors } = validateFindingUser(body);

        if (!isValid) {
            return NextResponse.json({
                message: "Please enter valid username , email and password"
            }, { status: 400 })
        }

        const { identifier, password } = body;

        //search the user 
        const searchUserSQL = `
    
        SELECT 
        staff_id,
        username, 
        email , 
        role
        password FROM users WHERE username = ? OR LOWER(email) = LOWER(?) `

        const [users]: any = await databaseConnection.execute(searchUserSQL, [identifier, identifier, identifier])

        if (users.length === 0 || !users) {
            return NextResponse.json({
                message: "Invalid data , Please try again with other details"
            } , {status : 401});
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({
                message: "Invalid Credentials"
            }, { status: 401 })
        }

        return NextResponse.json({
            message: "Login Successfull",
            data : {
                id :user.staff_id,
                name: user.username,
                role:user.role

            }
        }, { status: 200 })



    } catch (error: any) {
        console.log(error);

        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })

    }
}