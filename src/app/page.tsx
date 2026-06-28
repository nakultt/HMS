import { getHackathons } from "@/app/actions/hackathon";
import { getTeamsByHackathon } from "@/app/actions/team";
import { DashboardClient } from "@/components/dashboard-client";

export default async function Home() {
  const hackathons = await getHackathons();

  // Fetch team counts for each hackathon
  const teamCounts: Record<string, number> = {};
  for (const h of hackathons) {
    const teams = await getTeamsByHackathon(h._id);
    teamCounts[h._id] = teams.length;
  }

  return <DashboardClient hackathons={hackathons} teamCounts={teamCounts} />;
}
