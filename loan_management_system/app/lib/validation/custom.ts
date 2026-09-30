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

    // Validate staffId
    if (!data.staffId || typeof data.staffId !== "string" || !data.staffId.trim()) {
        errors.staffId = "Staff ID is required";
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
}