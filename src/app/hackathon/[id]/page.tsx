import { notFound } from "next/navigation";
import { getHackathonById } from "@/app/actions/hackathon";
import { getTeamsByHackathon, getUniqueTeamMembers } from "@/app/actions/team";
import { HackathonDetailClient } from "@/components/hackathon-detail-client";

export default async function HackathonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const hackathon = await getHackathonById(id);
  if (!hackathon) {
    notFound();
  }

  const teams = await getTeamsByHackathon(id);
  const uniqueTeamMembers = await getUniqueTeamMembers();

  return <HackathonDetailClient hackathon={hackathon} initialTeams={teams} uniqueTeamMembers={uniqueTeamMembers} />;
}
