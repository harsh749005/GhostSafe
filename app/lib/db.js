"use server";
import { neon } from "@neondatabase/serverless";

export const sql = neon('postgresql://axamine_owner:npg_4v5NwqsIEKzV@ep-gentle-unit-a2z23hab-pooler.eu-central-1.aws.neon.tech/axamine?sslmode=require&channel_binding=require');
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
