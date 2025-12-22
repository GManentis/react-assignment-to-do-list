//enums in ts are used only in case ts. Example:

enum Role {
    Admin,
    Editor,
    Guest
};

let userRole: Role;

userRole = Role.Admin;

//now the above matches Role.Admin = 0, Role.Editor = 1 and Role.Guest = 2