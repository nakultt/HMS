"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Zap, Rocket, MapPin, CalendarClock, Trophy, ArrowRight } from "lucide-react";

interface Hackathon {
  _id: string;
  name: string;
  location: string;
  lastRegistrationDate: string;
  nextRoundResultDate: string;
}

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

export function DashboardClient({
  hackathons,
  myStatuses,
}: {
  hackathons: Hackathon[];
  myStatuses: Record<string, string | null>;
}) {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-2"
            >
             
             
            </motion.div>
            
            
          </div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      {hackathons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-border shadow-sm">
            <Rocket className="size-4 text-blue-500" strokeWidth={2.5} />
            <span className="text-sm font-bold text-foreground">{hackathons.length} Hackathons</span>
          </div>
        </motion.div>
      )}

      {/* Table View */}
      {hackathons.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-card overflow-hidden shadow-sm"
        >
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[250px] font-semibold">Event Details</TableHead>
                <TableHead className="font-semibold">Location</TableHead>
                <TableHead className="font-semibold">Reg Status</TableHead>
                <TableHead className="font-semibold">Reg Date</TableHead>
                <TableHead className="font-semibold">Result Date</TableHead>
                <TableHead className="font-semibold">My Status</TableHead>
                <TableHead className="text-right font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hackathons.map((hackathon) => {
                const regOpen = isRegistrationOpen(hackathon.lastRegistrationDate);
                const status = myStatuses[hackathon._id];
                
                return (
                  <TableRow key={hackathon._id} className="group hover:bg-secondary/20 transition-colors">
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-base">{hackathon.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-3.5" />
                        {hackathon.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={regOpen ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}
                      >
                        {regOpen ? "Open" : "Closed"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarClock className="size-3.5 text-muted-foreground" />
                        <span className="font-medium">{formatDate(hackathon.lastRegistrationDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="size-3.5 text-muted-foreground" />
                        <span className="font-medium">{formatDate(hackathon.nextRoundResultDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {status ? (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                          {status}
                        </Badge>
                      ) : (
                        <span className="text-sm font-medium text-muted-foreground">Not Applied</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link 
                        href={`/hackathon/${hackathon._id}`}
                        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors gap-2 group-hover:shadow-md"
                      >
                        View
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-xl bg-secondary/20"
        >
          <div className="flex items-center justify-center size-16 rounded-full bg-blue-500/10 text-blue-500 mb-6">
            <Rocket className="size-8" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
            No Hackathons Yet
          </h2>
          <p className="text-sm text-muted-foreground font-medium mb-6 text-center max-w-sm">
            You don't have any hackathons tracked in the database.
          </p>
        </motion.div>
      )}
    </div>
  );
}
