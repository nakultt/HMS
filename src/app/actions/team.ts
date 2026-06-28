"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Team } from "@/lib/models/team";

export async function getTeamsByHackathon(hackathonId: string) {
  await connectDB();
  const teams = await Team.find({ hackathonId }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(teams));
}

export async function createTeam(data: any) {
  await connectDB();
  const team = await Team.create(data);
  revalidatePath(`/hackathon/${team.hackathonId}`);
  return JSON.parse(JSON.stringify(team));
}

export async function getUniqueTeamMembers() {
  await connectDB();
  const members = await Team.distinct("teamMembers.name");
  return members;
}

export async function updateTeam(
  id: string,
  data: {
    teamName?: string;
    status?: string;
    projectIdea?: string;
    teamMembers?: { name: string }[];
  }
) {
  await connectDB();
  const team = await Team.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!team) throw new Error("Team not found");

  revalidatePath(`/hackathon/${team.hackathonId}`);
  return JSON.parse(JSON.stringify(team));
}

export async function deleteTeam(id: string) {
  await connectDB();
  const team = await Team.findByIdAndDelete(id).lean();
  if (!team) throw new Error("Team not found");

  revalidatePath(`/hackathon/${team.hackathonId}`);
  return { success: true };
}
