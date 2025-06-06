"use server";
import { neon } from "@neondatabase/serverless";

export const sql = neon('postgresql://axamine_owner:npg_YStnb5PMVk3u@ep-gentle-unit-a2z23hab-pooler.eu-central-1.aws.neon.tech/axamine?sslmode=require');
let dbReady = false;

export async function ensureDBReady() {
  if (dbReady) return;

  try {
    await sql`SELECT 1`;
    dbReady = true;
  } catch (err) {
    throw new Error("Database not connected: " + err.message);
  }
}
