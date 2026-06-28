"use client";

import { useState } from "react";
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
import { Zap, Rocket, MapPin, CalendarClock, Trophy, ArrowRight, Plus, Edit2, Trash2 } from "lucide-react";
import { HackathonForm } from "./hackathon-form";
import { deleteHackathon } from "@/app/actions/hackathon";

interface Hackathon {
  _id: string;
  name: string;
  location: string;
  lastRegistrationDate: string;
  nextRoundResultDate: string;
  nextStep?: string;
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
  uniqueLocations,
}: {
  hackathons: Hackathon[];
  myStatuses: Record<string, string | null>;
  uniqueLocations: string[];
}) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null);

  const openNewForm = () => {
    setEditingHackathon(null);
    setIsFormOpen(true);
  };

  const openEditForm = (h: Hackathon) => {
    setEditingHackathon(h);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this hackathon? This will also delete any associated submissions.")) {
      try {
        await deleteHackathon(id);
      } catch (error) {
        console.error("Failed to delete hackathon:", error);
        alert("Failed to delete hackathon");
      }
    }
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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center size-12 bg-[#FFE600] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0 cursor-pointer"
            >
              <Zap className="size-6 text-black" strokeWidth={3} />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black leading-[1.1]">
              Your <span className="text-[#2979FF] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Hackathons</span>
            </h1>
            {hackathons.length > 0 && (
              <div className="inline-flex h-12 items-center justify-center gap-2 px-6 bg-white rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Rocket className="size-5 text-black" strokeWidth={2.5} />
                <span className="text-sm font-black uppercase tracking-wider text-black">{hackathons.length} Hackathons</span>
              </div>
            )}
          </div>
          <button
            onClick={openNewForm}
            className="w-full lg:w-auto inline-flex h-12 items-center justify-center gap-2 px-6 bg-[#00C853] text-black font-black uppercase tracking-wider border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          >
            <Plus className="size-5" strokeWidth={3} />
            New Hackathon
          </button>
        </div>
      </motion.div>



      {/* Table View */}
      {hackathons.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Table className="bg-white">
            <TableHeader className="bg-[#FFE600] border-b-2 border-black text-black">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[250px] font-black text-black">Event Details</TableHead>
                <TableHead className="font-black text-black">Location</TableHead>
                <TableHead className="font-black text-black">Reg Status</TableHead>
                <TableHead className="font-black text-black">Reg Date</TableHead>
                <TableHead className="font-black text-black">Result Date</TableHead>
                <TableHead className="font-black text-black">Next Step</TableHead>
                <TableHead className="font-black text-black">My Status</TableHead>
                <TableHead className="text-right font-black text-black">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hackathons.map((hackathon) => {
                const regOpen = isRegistrationOpen(hackathon.lastRegistrationDate);
                const status = myStatuses[hackathon._id];
                
                return (
                  <TableRow key={hackathon._id} className="group hover:bg-[#FFE600]/10 transition-colors border-b border-black">
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-base text-black">{hackathon.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-black font-bold">
                        <MapPin className="size-3.5" />
                        {hackathon.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-black uppercase tracking-wider border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                          regOpen ? "bg-[#00C853] text-black" : "bg-[#FF3B30] text-white"
                        }`}
                      >
                        {regOpen ? "Open" : "Closed"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-black">
                        <CalendarClock className="size-3.5" />
                        <span className="font-bold">{formatDate(hackathon.lastRegistrationDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-black">
                        <Trophy className="size-3.5" />
                        <span className="font-bold">{formatDate(hackathon.nextRoundResultDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-bold text-black block min-w-[150px] max-w-[250px] break-words">
                        {hackathon.nextStep || "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {status ? (
                        <span className="inline-block px-2.5 py-1 text-xs font-black uppercase tracking-wider bg-[#2979FF] text-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          {status}
                        </span>
                      ) : (
                        <span className="text-sm font-black text-black/50">Not Applied</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditForm(hackathon)}
                          className="inline-flex items-center justify-center bg-white px-3 py-2 text-sm font-bold text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        >
                          <Edit2 className="size-4" strokeWidth={3} />
                        </button>
                        <button
                          onClick={() => handleDelete(hackathon._id)}
                          className="inline-flex items-center justify-center bg-[#FF3B30] text-white px-3 py-2 text-sm font-bold border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        >
                          <Trash2 className="size-4" strokeWidth={3} />
                        </button>
                        <Link 
                          href={`/hackathon/${hackathon._id}`}
                          className="inline-flex items-center justify-center bg-black px-4 py-2 text-sm font-bold uppercase tracking-wide text-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all gap-2 group-hover:bg-[#FF3D00]"
                        >
                          View
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
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
          className="flex flex-col items-center justify-center py-20 border-2 border-black rounded-none bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex items-center justify-center size-16 bg-[#FFE600] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black mb-6">
            <Rocket className="size-8" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-black mb-2">
            No Hackathons Yet
          </h2>
          <p className="text-sm text-black font-bold mb-6 text-center max-w-sm">
            You don't have any hackathons tracked in the database.
          </p>
        </motion.div>
      )}

      {isFormOpen && (
        <HackathonForm
          initialData={editingHackathon}
          uniqueLocations={uniqueLocations}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
