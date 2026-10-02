import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/app/lib/db";

export async function POST(req: NextRequest) {
    const connection = await databaseConnection.getConnection();

    try {

        const body = await req.json();

        const sql = ``;

        const { data } = body

        const [result]: any = await connection.execute(sql, [data]);

        if(!result){
            return NextResponse.json({
                message : "Some data were not changed or user not found"
            } , {status : 404})
        }


        return NextResponse.json({
            message: "User data successfully changed",
            data: {
                ...result[0]

            }
        }, { status: 200 })





    } catch (error: any) {
        await connection.rollback();
        console.log("Changing user data failed ", error)

        return NextResponse.json({
            message: "Failed to update user details"
        }, { status: 500 })


    } finally {
        connection.release()
    }
}