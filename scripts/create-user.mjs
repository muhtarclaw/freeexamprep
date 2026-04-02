import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env"));

const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local."
  );
  process.exit(1);
}

const email = process.env.USER_EMAIL || "student@example.com";
const password = process.env.USER_PASSWORD || "ChangeMe123!";
const name = process.env.USER_NAME || "Sample User";
const lastname = process.env.USER_LASTNAME || "";
const role = process.env.USER_ROLE || "student";
const roleIdMap = {
  student: 1,
  admin: 2,
  super_admin: 3
};

if (!(role in roleIdMap)) {
  console.error("Invalid USER_ROLE. Use student, admin, or super_admin.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function main() {
  let userId = "";

  const { data: listedUsers, error: listError } =
    await supabase.auth.admin.listUsers();

  if (listError) {
    throw listError;
  }

  const existingUser = listedUsers.users.find((user) => user.email === email);

  if (existingUser) {
    userId = existingUser.id;

    const { error: updateUserError } = await supabase.auth.admin.updateUserById(
      userId,
      {
        password,
        email_confirm: true,
        user_metadata: { name, lastname },
        app_metadata: { role }
      }
    );

    if (updateUserError) {
      throw updateUserError;
    }
  } else {
    const { data: createdUser, error: createUserError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name, lastname },
        app_metadata: { role }
      });

    if (createUserError || !createdUser.user) {
      throw createUserError || new Error("Failed to create user.");
    }

    userId = createdUser.user.id;
  }

  const { error: userTableError } = await supabase.from("users").upsert(
    {
      id: userId,
      email,
      name,
      lastname: lastname || null,
      role_id: roleIdMap[role]
    },
    { onConflict: "id" }
  );

  if (userTableError) {
    if (userTableError.message?.includes("public.users")) {
      throw new Error(
        "The Supabase table public.users does not exist yet. Run supabase/schema.sql in your Supabase SQL editor, then run the command again."
      );
    }
    throw userTableError;
  }

console.log(`User is ready:
email: ${email}
name: ${name}
lastname: ${lastname || "(empty)"}
role: ${role}`);
}

main().catch((error) => {
  console.error("Failed to create user.");
  console.error(error.message || error);
  process.exit(1);
});
