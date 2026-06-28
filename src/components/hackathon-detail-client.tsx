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
          className="inline-flex items-center gap-2 text-sm font-bold text-black border-2 border-black bg-white px-3 py-1.5 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all mb-6 group"
        >
          <ArrowLeft className="size-4" />
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
              <div className="h-2 w-10 bg-[#FF3D00] border-2 border-black rounded-none" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-black">
                Event Detail
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black leading-[1.1] mb-3">
              {hackathon.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-black">
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
        <div className="flex flex-col gap-1.5 p-4 bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
            <CalendarClock className="size-3.5" />
            Registration Deadline
          </span>
          <span className="text-base font-black text-black mt-1">
            {formatDate(hackathon.lastRegistrationDate)}
          </span>
          {regDays > 0 && (
            <span className="text-xs font-black text-[#00C853] flex items-center gap-1">
              <Clock className="size-3" strokeWidth={3} />
              {regDays} days left
            </span>
          )}
        </div>
        
        <div className="flex flex-col gap-1.5 p-4 bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
            <Trophy className="size-3.5" />
            Result Date
          </span>
          <span className="text-base font-black text-black mt-1">
            {formatDate(hackathon.nextRoundResultDate)}
          </span>
          {resultDays > 0 && (
            <span className="text-xs font-black text-[#2979FF] flex items-center gap-1">
              <Clock className="size-3" strokeWidth={3} />
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
        <h2 className="text-xl font-black tracking-tight text-black">
          Project Details
        </h2>
        <div className="flex-1 h-[2px] bg-black" />
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
              <h3 className="text-sm font-black text-black mb-2 uppercase tracking-wider">Project Idea</h3>
              <p className="text-base text-black bg-white p-4 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-medium">
                {initialTeams[0].projectIdea}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-black text-black mb-3 uppercase tracking-wider">Members</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {initialTeams[0].teamMembers.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-none border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center justify-center size-10 rounded-none border-2 border-black bg-[#FFE600] text-black font-black text-lg">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-black text-black">{member.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-black font-bold">You have not registered any team for this hackathon yet.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
