"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { parse } from "path";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("email", [email])]
    );
    return result.total > 0 ? result.documents[0] : null;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    throw error;
  }
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  try {
    const existingUser = await getUserByEmail(email);
    console.log("Existing user:", existingUser);

    const accountId = await sendEmailOTP({ email });
    console.log("Generated accountId (userId from OTP):", accountId);

    if (!accountId) throw new Error("Failed to send an OTP");

    if (!existingUser) {
      const { databases } = await createAdminClient();

      const doc = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        {
          fullName,
          email,
          avatar:
            "https://imgs.search.brave.com/abkapSUByvjrrYYoLh2trkZvVMg8i2h4UGc3kDhOfG4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ5/NTA4ODA0My9mci92/ZWN0b3JpZWwvaWMl/QzMlQjRuZS1kZS1w/cm9maWwtdXRpbGlz/YXRldXItYXZhdGFy/LW91LWljJUMzJUI0/bmUtZGUtcGVyc29u/bmUtcGhvdG8tZGUt/cHJvZmlsLXN5bWJv/bGUtcG9ydHJhaXQu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PW1vTlJaall0VnBI/LUkwbUFlLVpmalZr/dXdnQ09xSC1CUlhG/TGhRa1pvUDg9",
          accountId,
        }
      );
      console.log("User document created:", doc);
    }

    return parseStringify({ accountId });
  } catch (error) {
    console.error("Error in createAccount:", error);
    throw error; // rethrow to propagate error
  }
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

export const getCurrentUser = async () => {
  const { databases, account } = await createSessionClient();

  const result = await account.get();

  const user = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("accountId", result.$id)]
  );
  if (user.total <= 0) return null;
  return parseStringify(user.documents[0]);
};
