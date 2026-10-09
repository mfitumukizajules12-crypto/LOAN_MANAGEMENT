import databaseConnection from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { deleteUser } from "@/app/lib/validation/custom";


export async function DELETE(req: NextRequest) {

    const connection = await databaseConnection.getConnection();



    try {

        const body = await req.json();

        const { isValid, errors } = deleteUser();
        // can delete by username , staff id , email  after we add validation to delete
        const deleteUserSQL = `DELETE FROM users WHERE staff_id = ?`

        const [deleteUser]: any = await connection.execute(deleteUserSQL, [])

        if (deleteUser.affectedRows === 0) {
            return NextResponse.json({
                message: "User not found to delete"
            }, { status: 404 })
        }


    } catch (error: any) {
        await connection.rollback();
        console.log("Deleting user failedd", error)

        return NextResponse.json({
            message: "Failed to delete user"
        }, { status: 500 })

    }
}