"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TeamTable } from "@/components/team-table";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  CalendarClock,
  Trophy,
  Users,
  Clock,
} from "lucide-react";

interface Hackathon {
  _id: string;
  name: string;
  location: string;
  lastRegistrationDate: string;
  nextRoundResultDate: string;
}

interface TeamMember {
  name: string;
  role: string;
}

interface Team {
  _id: string;
  hackathonId: string;
  teamName: string;
  teamMembers: TeamMember[];
  projectIdea: string;
  status: "Applied" | "Shortlisted" | "Finalist" | "Won";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getDaysRemaining(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
}

export function HackathonDetailClient({
  hackathon,
  initialTeams,
}: {
  hackathon: Hackathon;
  initialTeams: Team[];
}) {
  const regDays = getDaysRemaining(hackathon.lastRegistrationDate);
  const resultDays = getDaysRemaining(hackathon.nextRoundResultDate);

  // Status counts
  const statusCounts = initialTeams.reduce(
    (acc, team) => {
      acc[team.status] = (acc[team.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black/50 hover:text-black transition-colors mb-6 group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.5} />
          All Hackathons
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1 w-8 bg-[#2979FF]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                Hackathon Detail
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black leading-[0.95] mb-3">
              {hackathon.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-black/60">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" strokeWidth={2.5} />
                {hackathon.location}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Cards Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
      >
        <div className="flex flex-col gap-1 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-black/40 flex items-center gap-1">
            <CalendarClock className="size-3" strokeWidth={2.5} />
            Registration Deadline
          </span>
          <span className="text-base font-black text-black">
            {formatDate(hackathon.lastRegistrationDate)}
          </span>
          {regDays > 0 && (
            <span className="text-xs font-bold text-[#00C853] flex items-center gap-1">
              <Clock className="size-3" strokeWidth={2.5} />
              {regDays} days left
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-black/40 flex items-center gap-1">
            <Trophy className="size-3" strokeWidth={2.5} />
            Result Date
          </span>
          <span className="text-base font-black text-black">
            {formatDate(hackathon.nextRoundResultDate)}
          </span>
          {resultDays > 0 && (
            <span className="text-xs font-bold text-[#2979FF] flex items-center gap-1">
              <Clock className="size-3" strokeWidth={2.5} />
              {resultDays} days left
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-black/40 flex items-center gap-1">
            <Users className="size-3" strokeWidth={2.5} />
            Total Teams
          </span>
          <span className="text-3xl font-black text-black">
            {initialTeams.length}
          </span>
        </div>
        <div className="flex flex-col gap-1 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">
            Status Breakdown
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {(["Applied", "Shortlisted", "Finalist", "Won"] as const).map((s) =>
              statusCounts[s] ? (
                <Badge
                  key={s}
                  variant={s.toLowerCase() as "applied" | "shortlisted" | "finalist" | "won"}
                  className="text-[10px]"
                >
                  {statusCounts[s]} {s}
                </Badge>
              ) : null
            )}
          </div>
        </div>
      </motion.div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 mb-4"
      >
        <h2 className="text-lg font-black uppercase tracking-tight text-black">
          Team Submissions
        </h2>
        <div className="flex-1 h-0.5 bg-black/10" />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <TeamTable initialTeams={initialTeams} hackathonId={hackathon._id} />
      </motion.div>
    </div>
  );
}
