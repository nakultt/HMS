"use server";

import { connectDB } from "@/lib/db";
import { Hackathon } from "@/lib/models/hackathon";

export async function getHackathons() {
  await connectDB();
  const hackathons = await Hackathon.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(hackathons));
}

export async function getHackathonById(id: string) {
  await connectDB();
  const hackathon = await Hackathon.findById(id).lean();
  if (!hackathon) return null;
  return JSON.parse(JSON.stringify(hackathon));
}
