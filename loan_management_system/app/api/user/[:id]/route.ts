import { NextRequest , NextResponse } from "next/server";
import { validateUserToSee } from "@/app/lib/validation/custom";
import databaseConnection from "@/app/lib/db";


export async function POST(req: NextRequest){

    const connection = await databaseConnection.getConnection();

    try {

        const body = await req.json();

        const { isValid ,error} = validateUserToSee(body);

        if(!isValid){
            NextResponse.json({
                message : "Invalid Credentials"
            } , {status : 400})
        }

        const { userId } = body;

        const sql = `
        SELECT username , staff_id, email, role FROM users WHERE id = ? OR LOWER(staff_id) = LOWER(?)`;

        const [result]: any = await connection.execute(sql , [userId , userId]);

        if(result.length === 0){
           return NextResponse.json({
                message : "User not found , use another id or staff id"
            } , {status : 404})
        }

        return NextResponse.json({
            message : "User found successfull",
            data : {
                ...result[0]
            }
        })


        
    } catch (error: any) {
        console.log("Error on viewing the user" , error);

        return NextResponse.json({
            message : "Try again later , something went wrong"
        } , {status : 500});
        
    }
}