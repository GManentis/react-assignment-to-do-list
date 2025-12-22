//enums in ts are used only in case ts. Example:
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["Editor"] = 1] = "Editor";
    Role[Role["Guest"] = 2] = "Guest";
})(Role || (Role = {}));
;
var userRole;
userRole = Role.Admin;
