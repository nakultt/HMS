"use client";

import { useTransition } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HackathonCard } from "@/components/hackathon-card";
import { Button } from "@/components/ui/button";
import { seedDatabase } from "@/app/actions/seed";
import { Zap, Database, Rocket } from "lucide-react";
import { toast } from "sonner";

interface Hackathon {
  _id: string;
  name: string;
  location: string;
  lastRegistrationDate: string;
  nextRoundResultDate: string;
}

export function DashboardClient({
  hackathons,
  teamCounts,
}: {
  hackathons: Hackathon[];
  teamCounts: Record<string, number>;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSeed = () => {
    startTransition(async () => {
      try {
        const result = await seedDatabase();
        toast.success("Database seeded!", {
          description: `Created ${result.hackathonsCreated} hackathons and ${result.teamsCreated} teams`,
        });
        router.refresh();
      } catch {
        toast.error("Failed to seed database");
      }
    });
  };

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
              <div className="h-1 w-8 bg-[#FFE600]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                Dashboard
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-[0.9]">
              Your
              <br />
              <span className="relative inline-block">
                Hackathons
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="absolute -bottom-1 left-0 right-0 h-3 bg-[#FFE600] -z-10 origin-left"
                />
              </span>
            </h1>
            <p className="mt-3 text-sm font-medium text-black/50 max-w-md">
              Manage hackathon submissions, track team progress, and organize judging rounds.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              variant="accent"
              onClick={handleSeed}
              disabled={isPending}
              className="flex items-center gap-2"
            >
              <Database className="size-4" strokeWidth={2.5} />
              {isPending ? "Seeding..." : "Seed Database"}
            </Button>
          </motion.div>
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
          <div className="flex items-center gap-2 px-4 py-2 bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Rocket className="size-4" strokeWidth={2.5} />
            <span className="text-sm font-black">{hackathons.length} Events</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#2979FF] text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Zap className="size-4" strokeWidth={2.5} />
            <span className="text-sm font-black">
              {Object.values(teamCounts).reduce((a, b) => a + b, 0)} Total Teams
            </span>
          </div>
        </motion.div>
      )}

      {/* Cards Grid */}
      {hackathons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((hackathon, index) => (
            <HackathonCard
              key={hackathon._id}
              hackathon={hackathon}
              index={index}
              teamCount={teamCounts[hackathon._id] || 0}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-black/20"
        >
          <div className="flex items-center justify-center size-16 bg-[#FFE600] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
            <Rocket className="size-8 text-black" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-2">
            No Hackathons Yet
          </h2>
          <p className="text-sm text-black/50 font-medium mb-6 text-center max-w-sm">
            Click the &ldquo;Seed Database&rdquo; button above to populate the system with sample hackathon data.
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={handleSeed}
            disabled={isPending}
          >
            <Database className="size-5" strokeWidth={2.5} />
            {isPending ? "Seeding..." : "Get Started — Seed Now"}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
