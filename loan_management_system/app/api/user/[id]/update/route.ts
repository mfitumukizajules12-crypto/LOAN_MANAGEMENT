import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/app/lib/db";
import { updateUserdata } from "@/app/lib/validation/custom";
import bcrypt from "bcrypt";

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;
    const connection = await databaseConnection.getConnection();

    try {

        const body = await req.json();

        const { isValid, errors } = updateUserdata(body, id);


        if (!id.startsWith("lms_")) {
            return NextResponse.json({
                message: "Please provide a valid user staff id"
            }, { status: 400 })
        }
        
        if (!isValid) {
            return NextResponse.json({
                message: "Please provide valid data all fields required", errors
            }, { status: 401 })
        };



        const allowedField = ["username", "password", "email", "role"];

        const fieldToUpdate: string[] = [];
        const values: any[] = [];


        for (const [keys, value] of Object.entries(body)) {
            if (allowedField.includes(keys) && value !== "undefined" && value !== "null" && value !== "") {
                if (keys === 'password') {
                    const hashedPassword = await bcrypt.hash(value as string, 10);
                    fieldToUpdate.push(`${keys} = ?`);
                    values.push(hashedPassword);

                } else {
                    fieldToUpdate.push(`${keys} = ?`);
                    values.push(value);

                }

            }
            else {
                return NextResponse.json({
                    message: "Please provide valid fields ",
                    validFields: `${allowedField.join(", ")}`
                }, { status: 400 })
            }
        }

        values.push(id); // for the id on the last WHERE

        if (fieldToUpdate.length === 0) {
            return NextResponse.json({
                message: "Make sure all fields are not empty"
            }, { status: 400 })
        }

        const updateUserSQL = `UPDATE users SET ${fieldToUpdate.join(", ")} WHERE LOWER(staff_id) = LOWER(?)`;

        const [updateUserData]: any = await connection.execute(updateUserSQL, values);

        if (updateUserData.affectedRows === 0) {
            return NextResponse.json({
                message: "User Not Found To Update"
            }, { status: 404 })
        }

        const [findUpdatedUser]: any = await connection.query(`SELECT username , email , role , staff_id FROM users WHERE staff_id = LOWER(?)`, [id, id]);


        if (findUpdatedUser.length === 0) {
            return NextResponse.json({
                message: "User not found to update"
            }, { status: 404 })
        }

        return NextResponse.json({
            message: "User data changed successfull",
            data: {
                ...findUpdatedUser[0]
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