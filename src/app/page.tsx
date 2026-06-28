import { getHackathons } from "@/app/actions/hackathon";
import { getTeamsByHackathon } from "@/app/actions/team";
import { DashboardClient } from "@/components/dashboard-client";

export default async function Home() {
  const hackathons = await getHackathons();

  // Fetch my submissions for each hackathon
  const myStatuses: Record<string, string | null> = {};
  for (const h of hackathons) {
    const teams = await getTeamsByHackathon(h._id);
    myStatuses[h._id] = teams.length > 0 ? teams[0].status : null;
  }

  return <DashboardClient hackathons={hackathons} myStatuses={myStatuses} />;
}
