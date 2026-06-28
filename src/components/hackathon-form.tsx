"use client";

import { useState } from "react";
import { createHackathon, updateHackathon } from "@/app/actions/hackathon";
import { X } from "lucide-react";

export function HackathonForm({
  initialData,
  uniqueLocations,
  onClose,
}: {
  initialData?: any;
  uniqueLocations: string[];
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    location: initialData?.location || "",
    lastRegistrationDate: initialData?.lastRegistrationDate
      ? new Date(initialData.lastRegistrationDate).toISOString().split("T")[0]
      : "",
    nextRoundResultDate: initialData?.nextRoundResultDate
      ? new Date(initialData.nextRoundResultDate).toISOString().split("T")[0]
      : "",
  });

  const defaultLocations = ["Chennai", "Coimbatore", "Bengaluru", "Erode"];
  const allLocations = Array.from(new Set([...defaultLocations, ...uniqueLocations]));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSubmit = {
        name: formData.name,
        location: formData.location,
        lastRegistrationDate: new Date(formData.lastRegistrationDate),
        nextRoundResultDate: new Date(formData.nextRoundResultDate),
      };

      if (initialData?._id) {
        await updateHackathon(initialData._id, dataToSubmit);
      } else {
        await createHackathon(dataToSubmit);
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b-2 border-black bg-[#FFE600]">
          <h2 className="text-xl font-black text-black uppercase tracking-wider">
            {initialData ? "Edit Hackathon" : "New Hackathon"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-colors"
          >
            <X className="size-5" strokeWidth={3} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-black text-black">Event Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-2 border-black p-2.5 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="e.g. Caterpillar Tech Challenge"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-black text-black">Location</label>
            <input
              required
              type="text"
              list="locations"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border-2 border-black p-2.5 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="Select or type a city"
            />
            <datalist id="locations">
              {allLocations.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-black text-black">Reg. Deadline</label>
              <input
                required
                type="date"
                value={formData.lastRegistrationDate}
                onChange={(e) => setFormData({ ...formData, lastRegistrationDate: e.target.value })}
                className="w-full border-2 border-black p-2.5 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-black text-black">Result Date</label>
              <input
                required
                type="date"
                value={formData.nextRoundResultDate}
                onChange={(e) => setFormData({ ...formData, nextRoundResultDate: e.target.value })}
                className="w-full border-2 border-black p-2.5 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              />
            </div>
          </div>
          
          <div className="pt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white font-black uppercase tracking-widest py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Hackathon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
