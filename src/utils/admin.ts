import { UserRole } from '@prisma/client';

function isAdmin(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.SUPERADMIN;
}

function mapRole(role: UserRole | undefined) {
  switch (role) {
    case UserRole.USER:
      return 'User';
    case UserRole.ADMIN:
      return 'Admin';
    case UserRole.SUPERADMIN:
      return 'Super Admin';
    default:
      return 'Unknown Role';
  }
}

export { isAdmin, mapRole };
