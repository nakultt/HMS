"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CalendarClock, Trophy, ArrowRight, Users } from "lucide-react";

interface HackathonCardProps {
  hackathon: {
    _id: string;
    name: string;
    location: string;
    lastRegistrationDate: string;
    nextRoundResultDate: string;
  };
  index: number;
  teamCount?: number;
}

const accentColors = ["#FFE600", "#2979FF", "#FF6D00", "#00C853", "#AA00FF", "#FF1493"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isRegistrationOpen(dateStr: string) {
  return new Date(dateStr) > new Date();
}

export function HackathonCard({ hackathon, index, teamCount = 0 }: HackathonCardProps) {
  const color = accentColors[index % accentColors.length];
  const regOpen = isRegistrationOpen(hackathon.lastRegistrationDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.15 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={`/hackathon/${hackathon._id}`} className="block">
        <Card className="group cursor-pointer hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-150 relative overflow-hidden">
          {/* Color accent bar */}
          <div
            className="absolute top-0 left-0 w-full h-2 border-b-2 border-black"
            style={{ backgroundColor: color }}
          />

          <CardHeader className="pt-6">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base leading-snug">
                {hackathon.name}
              </CardTitle>
              <Badge variant={regOpen ? "applied" : "secondary"} className="shrink-0 text-[10px]">
                {regOpen ? "Open" : "Closed"}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-1.5 mt-1">
              <MapPin className="size-3.5 shrink-0" strokeWidth={2.5} />
              {hackathon.location}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 p-2.5 bg-[#f5f5f5] border-2 border-black">
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/50 flex items-center gap-1">
                  <CalendarClock className="size-3" strokeWidth={2.5} />
                  Registration
                </span>
                <span className="text-sm font-black text-black">
                  {formatDate(hackathon.lastRegistrationDate)}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-2.5 bg-[#f5f5f5] border-2 border-black">
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/50 flex items-center gap-1">
                  <Trophy className="size-3" strokeWidth={2.5} />
                  Results
                </span>
                <span className="text-sm font-black text-black">
                  {formatDate(hackathon.nextRoundResultDate)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t-2 border-dashed border-black/20">
              <span className="text-xs font-bold text-black/50 flex items-center gap-1.5">
                <Users className="size-3.5" strokeWidth={2.5} />
                {teamCount} {teamCount === 1 ? "Team" : "Teams"} Registered
              </span>
              <motion.span
                className="flex items-center gap-1 text-xs font-black uppercase text-black"
                whileHover={{ x: 4 }}
              >
                View
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" strokeWidth={3} />
              </motion.span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
