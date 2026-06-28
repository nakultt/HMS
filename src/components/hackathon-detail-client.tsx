"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  CalendarClock,
  Trophy,
  FolderDot,
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
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
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
              <div className="h-1 w-8 bg-blue-500 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Event Detail
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-[1.1] mb-3">
              {hackathon.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
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
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
      >
        <div className="flex flex-col gap-1.5 p-4 bg-card border border-border rounded-xl shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <CalendarClock className="size-3.5" />
            Registration Deadline
          </span>
          <span className="text-base font-bold text-foreground mt-1">
            {formatDate(hackathon.lastRegistrationDate)}
          </span>
          {regDays > 0 && (
            <span className="text-xs font-semibold text-green-500 flex items-center gap-1">
              <Clock className="size-3" />
              {regDays} days left
            </span>
          )}
        </div>
        
        <div className="flex flex-col gap-1.5 p-4 bg-card border border-border rounded-xl shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Trophy className="size-3.5" />
            Result Date
          </span>
          <span className="text-base font-bold text-foreground mt-1">
            {formatDate(hackathon.nextRoundResultDate)}
          </span>
          {resultDays > 0 && (
            <span className="text-xs font-semibold text-blue-500 flex items-center gap-1">
              <Clock className="size-3" />
              {resultDays} days left
            </span>
          )}
        </div>
        

      </motion.div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 mb-6"
      >
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Project Details
        </h2>
        <div className="flex-1 h-px bg-border" />
      </motion.div>

      {/* Team Members List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        {initialTeams.length > 0 ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Project Idea</h3>
              <p className="text-base text-foreground bg-secondary/50 p-4 rounded-lg border border-border">
                {initialTeams[0].projectIdea}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Members</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {initialTeams[0].teamMembers.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card shadow-sm">
                    <div className="flex items-center justify-center size-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{member.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-secondary/20 rounded-xl border border-dashed border-border">
            <p className="text-muted-foreground">You have not registered any team for this hackathon yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
