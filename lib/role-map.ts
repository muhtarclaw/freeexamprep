export const ROLE_TO_ID = {
  student: 1,
  admin: 2,
  super_admin: 3
} as const;

export type AppRole = keyof typeof ROLE_TO_ID;
