process.env.USER_EMAIL = process.env.ADMIN_EMAIL || "idrisaydev@gmail.com";
process.env.USER_PASSWORD = process.env.ADMIN_PASSWORD || "ChangeMe123!";
process.env.USER_NAME = process.env.ADMIN_NAME || "uniqueay";
process.env.USER_LASTNAME = process.env.ADMIN_LASTNAME || "";
process.env.USER_ROLE = process.env.ADMIN_ROLE || "super_admin";

await import("./create-user.mjs");
