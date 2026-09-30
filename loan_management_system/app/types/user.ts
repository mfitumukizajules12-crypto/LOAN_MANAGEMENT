
export type UserRole = 'Member' | 'Accountant' | 'Loan Officer' | 'President' | 'Admin';

export interface newUser {
    id?: string;
    staffId?: string;
    name: string;
    email: string;
    role: UserRole;
    active: boolean;
    password:string;
}
