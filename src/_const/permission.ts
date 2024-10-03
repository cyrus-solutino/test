export enum PermissionType {
  UPLOAD='UPLOAD',
  READ='READ',
  UPDATE='UPDATE',
  PUBLISH='PUBLISH',
  MODIFY_PERMISSIONS='MODIFY_PERMISSIONS',
}

export enum CompanyGrantType {
  GROUP='GROUP',
  MANUAL='MANUAL'
}

export enum UserStatusType {
  ACTIVE='ACTIVE',
  PENDING='PENDING',
  EXPIRED='EXPIRED'
}

export enum UserRoleType {
  ADMIN='ADMIN',
  MASTER = "ADMIN",
  USER = "USER",
  CLIENT = "CLIENT",

}

export const checkPermissionToUserRole = function (permission: PermissionType, userRole: UserRoleType): boolean {

  switch (userRole) {
    case UserRoleType.USER:
      return USER_PERMISSIONS.indexOf(permission) >= 0;
    case UserRoleType.CLIENT:
      return CLIENT_PERMISSIONS.indexOf(permission) >= 0;
    case UserRoleType.MASTER || UserRoleType.ADMIN:
      return MASTER_PERMISSIONS.indexOf(permission) >= 0;
    default:
      return false;
  }
}

// Pre-defined permissions
export const MASTER_NAME = "MASTER";
export const USER_NAME = "USER";
export const CLIENT_NAME = "CLIENT";
export const MASTER_PERMISSIONS: PermissionType[] = Object.values(PermissionType);
export const USER_PERMISSIONS: PermissionType[] = [
  PermissionType.UPLOAD,
  PermissionType.READ,
  PermissionType.UPDATE,
  PermissionType.PUBLISH,
];
export const CLIENT_PERMISSIONS: PermissionType[] = [PermissionType.UPLOAD, PermissionType.READ];

export const getPermissions = function (userRole: UserRoleType): PermissionType[] {

  let permissions: PermissionType[] = [];
  switch (userRole){
    case UserRoleType.USER: permissions = USER_PERMISSIONS; break;
    case UserRoleType.MASTER || UserRoleType.ADMIN: permissions = MASTER_PERMISSIONS; break;
    case UserRoleType.CLIENT: permissions = CLIENT_PERMISSIONS; break;
  }

  return permissions;

};
