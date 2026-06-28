"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { TeamSheet } from "@/components/team-sheet";
import { getTeamsByHackathon } from "@/app/actions/team";
import { Settings2, ArrowUpDown, Search, Users } from "lucide-react";

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

const columnHelper = createColumnHelper<Team>();

const columns = [
  columnHelper.display({
    id: "index",
    header: "#",
    cell: (info) => (
      <span className="text-black/40 font-black text-xs">
        {String(info.row.index + 1).padStart(2, "0")}
      </span>
    ),
    size: 50,
  }),
  columnHelper.accessor("teamName", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-1.5 hover:text-[#2979FF] transition-colors"
        onClick={() => column.toggleSorting()}
      >
        Team Name
        <ArrowUpDown className="size-3" strokeWidth={2.5} />
      </button>
    ),
    cell: (info) => (
      <span className="font-bold text-black">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor((row) => row.teamMembers[0]?.name ?? "—", {
    id: "leadContact",
    header: "Lead Contact",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center size-6 bg-black text-white text-[10px] font-black shrink-0">
          {(info.getValue() as string).charAt(0)}
        </div>
        <span className="font-medium text-black/80">{info.getValue() as string}</span>
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-1.5 hover:text-[#2979FF] transition-colors"
        onClick={() => column.toggleSorting()}
      >
        Status
        <ArrowUpDown className="size-3" strokeWidth={2.5} />
      </button>
    ),
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: () => null, // Will be handled in the row render
  }),
];

export function TeamTable({
  initialTeams,
  hackathonId,
}: {
  initialTeams: Team[];
  hackathonId: string;
}) {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const refreshTeams = useCallback(async () => {
    const updated = await getTeamsByHackathon(hackathonId);
    setTeams(updated);
  }, [hackathonId]);

  const table = useReactTable({
    data: teams,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleOpenSheet = (team: Team) => {
    setSelectedTeam(team);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-black/40" strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search teams..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border-2 border-black bg-white text-sm font-bold text-black placeholder:text-black/30 placeholder:font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] outline-none transition-all duration-150"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-black/50">
          <Users className="size-3.5" strokeWidth={2.5} />
          {table.getFilteredRowModel().rows.length} of {teams.length} teams
        </div>
      </div>

      {/* Data Table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b-0 hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, idx) => (
              <motion.tr
                key={row.id}
                data-slot="table-row"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.3 }}
                className="border-b border-black/10 transition-colors hover:bg-[#FFE600]/5 cursor-pointer group"
                onClick={() => handleOpenSheet(row.original)}
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === "actions") {
                    return (
                      <TableCell key={cell.id} className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenSheet(row.original);
                          }}
                        >
                          <Settings2 className="size-3.5" strokeWidth={2.5} />
                          Manage
                        </Button>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 text-center">
                <div className="flex flex-col items-center gap-2 text-black/40">
                  <Users className="size-8" strokeWidth={1.5} />
                  <span className="font-bold">No teams found</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Sheet */}
      <TeamSheet
        team={selectedTeam}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onUpdate={refreshTeams}
      />
    </div>
  );
}
