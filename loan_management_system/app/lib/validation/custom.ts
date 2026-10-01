import { object } from "zod";
import { isValid } from "zod/v3";

// Define custom validation rules
export function validateCreateUser(data: any) {
    const errors: Record<string, string> = {};

    if (!data || typeof data !== "object") {
        return {
            isValid: false,
            errors: { body: "Invalid request payload. Request body cannot be empty." },
        };
    }



    // Validate name
    if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
        errors.name = "Name is required";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = "A valid email address is required";
    }

    // Validate password
    if (!data.password || typeof data.password !== "string" || data.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
    }

    // Validate role
    const validRoles = ["Member", "Accountant", "Loan Officer", "President", "Admin"];
    if (!data.role || !validRoles.includes(data.role)) {
        errors.role = "Role must be one of: " + validRoles.join(", ");
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };




};

//validate to find the user by id
export function validateFindingUser(data: any) {

    const errors: Record<string, string> = {}

    //     / id?: string | undefined;
    // name?: string | undefined;
    // email?: string | undefined;
    if (!data || typeof data !== "object") {
        return {
            isvalid: false,
            errors: { body: "Invalid Data entered, try again" }
        };
    }

    if (!data.identifier || !data.password) {
        return {
            errors: "All fields are required ."
        }
    }



    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }

}