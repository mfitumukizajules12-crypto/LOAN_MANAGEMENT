import databaseConnection from "@/app/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";



export async function GET() {

    try {

        const [rows] = await databaseConnection.query<RowDataPacket[]>(
            "SHOW TABLES;"
        );

        return NextResponse.json({
            sucess: true,
            tables: rows
        } , {status : 200})


    } catch (error: any) {

        NextResponse.json({
            success : false ,
            message : "Failed to fetch your table rows try again later sir"
        } , { status : 500})

        console.log("An error occured befoer we could test the api \n", error)
        // throw new Error("Failed Please try again later !")
    }
}