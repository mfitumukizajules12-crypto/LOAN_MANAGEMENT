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

    if(!data || !data.userId){
        return {
            errors : {
                body : "Invalid data is entered , please provide a user id"
            }
        }
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

export function validateUserToSee(data:any){
    const error: Record<string , string> = {};

    if(!data || typeof data != "string"){
        return {
            isValid : false,
            errors : {
                body : "Invalid data entered try again later"
            }
        }
    }

    return {
        isValid : Object.keys(error).length === 0,
        error
    }
}

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

export function updateUserdata(data: any , id: string){
    const errors: Record<string, string> = {};

    if(!data || !id || typeof id !== "string" || typeof data !== "object"){
        return {
            isValid : false ,
            message : {
                body : "Invalid Payload, Please provide valid data"
            }
        }
    }

    if(!id.startsWith("lms_")){
        return {
            isValid : false,
            message : {
                body : "Please Provide valid staff id"
            }
        }
    }

  


    return {
        isValid : Object.keys(errors).length === 0,
        errors
    }
}

export function deleteUser(data : any){
    const errors: Record<string, string> = {}

    if(!data || typeof data !== "object"){
        return {
            isValid : false ,
            message : "Please Provide Valid payload"
        }
    }

    if(!data.userId){
        return {
            message : {
                body : "Please Provide staff id on your card "
            }
        }
    }



    return {
        isValid : Object.keys(errors).length === 0,
        errors
    }
}