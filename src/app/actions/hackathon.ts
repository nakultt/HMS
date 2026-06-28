"use server";

import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db";
import { Hackathon } from "@/lib/models/hackathon";
import { Team } from "@/lib/models/team";

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

export async function createHackathon(data: any) {
  await connectDB();
  const hackathon = await Hackathon.create(data);
  revalidatePath("/");
  return JSON.parse(JSON.stringify(hackathon));
}

export async function updateHackathon(id: string, data: any) {
  await connectDB();
  const hackathon = await Hackathon.findByIdAndUpdate(id, data, { new: true });
  revalidatePath("/");
  revalidatePath(`/hackathon/${id}`);
  return JSON.parse(JSON.stringify(hackathon));
}

export async function getUniqueLocations() {
  await connectDB();
  const locations = await Hackathon.distinct("location");
  return locations;
}

export async function deleteHackathon(id: string) {
  await connectDB();
  await Team.deleteMany({ hackathonId: id });
  const hackathon = await Hackathon.findByIdAndDelete(id);
  if (!hackathon) throw new Error("Hackathon not found");
  
  revalidatePath("/");
  return { success: true };
}
