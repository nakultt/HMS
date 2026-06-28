"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { updateTeam, deleteTeam } from "@/app/actions/team";
import { Save, Trash2, User, Briefcase, Lightbulb, Users, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

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

interface TeamSheetProps {
  team: Team | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

const statuses = ["Applied", "Shortlisted", "Finalist", "Won"] as const;

export function TeamSheet({ team, open, onOpenChange, onUpdate }: TeamSheetProps) {
  const [status, setStatus] = useState(team?.status || "Applied");
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Reset state when team changes
  if (team && status !== team.status && !isPending) {
    setStatus(team.status);
  }

  const handleSave = () => {
    if (!team) return;
    startTransition(async () => {
      try {
        await updateTeam(team._id, { status });
        toast.success("Team status updated!", {
          description: `${team.teamName} is now ${status}`,
        });
        onUpdate();
        onOpenChange(false);
      } catch {
        toast.error("Failed to update team");
      }
    });
  };

  const handleDelete = () => {
    if (!team) return;
    startTransition(async () => {
      try {
        await deleteTeam(team._id);
        toast.success("Team deleted", {
          description: `${team.teamName} has been removed`,
        });
        onUpdate();
        onOpenChange(false);
        setShowDeleteConfirm(false);
      } catch {
        toast.error("Failed to delete team");
      }
    });
  };

  if (!team) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="pr-12">
          <SheetTitle>{team.teamName}</SheetTitle>
          <SheetDescription>
            Manage team details and judging status
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* Status Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black/50">
              <Briefcase className="size-3.5" strokeWidth={2.5} />
              Judging Status
            </label>
            <div className="flex items-center gap-3">
              <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <StatusBadge status={status} />
            </div>
          </motion.div>

          {/* Project Idea */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black/50">
              <Lightbulb className="size-3.5" strokeWidth={2.5} />
              Project Idea
            </label>
            <div className="p-4 bg-[#f5f5f5] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-sm leading-relaxed text-black font-medium">
                {team.projectIdea}
              </p>
            </div>
          </motion.div>

          {/* Team Members */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black/50">
              <Users className="size-3.5" strokeWidth={2.5} />
              Team Members ({team.teamMembers.length})
            </label>
            <div className="space-y-2">
              {team.teamMembers.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + idx * 0.05 }}
                  className="flex items-center gap-3 p-3 border-2 border-black bg-white hover:bg-[#FFE600]/10 transition-colors"
                >
                  <div className="flex items-center justify-center size-8 bg-black text-white text-xs font-black shrink-0">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black truncate flex items-center gap-1.5">
                      <User className="size-3 shrink-0" strokeWidth={2.5} />
                      {member.name}
                    </p>
                    <p className="text-xs text-black/50 font-medium truncate">
                      {member.role}
                    </p>
                  </div>
                  {idx === 0 && (
                    <Badge variant="default" className="text-[10px] shrink-0">
                      Lead
                    </Badge>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Actions */}
        <SheetFooter>
          <AnimatePresence mode="wait">
            {showDeleteConfirm ? (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex w-full flex-col gap-3"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-[#FF3B30]">
                  <AlertTriangle className="size-4" strokeWidth={2.5} />
                  Are you sure? This cannot be undone.
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={handleDelete}
                    disabled={isPending}
                  >
                    <Trash2 className="size-4" />
                    {isPending ? "Deleting..." : "Yes, Delete"}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex w-full gap-3"
              >
                <Button
                  variant="accent"
                  className="flex-1"
                  onClick={handleSave}
                  disabled={isPending}
                >
                  <Save className="size-4" />
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="ghost"
                  className="border-2 border-[#FF3B30] text-[#FF3B30] hover:bg-[#FF3B30]/10"
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isPending}
                >
                  <Trash2 className="size-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
