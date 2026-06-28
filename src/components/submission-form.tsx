"use client";

import { useState } from "react";
import { createTeam, updateTeam } from "@/app/actions/team";
import { X, Plus, Trash2 } from "lucide-react";

export function SubmissionForm({
  hackathonId,
  initialData,
  uniqueTeamMembers,
  onClose,
}: {
  hackathonId: string;
  initialData?: any;
  uniqueTeamMembers: string[];
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    teamName: initialData?.teamName || "My Team", // We auto-provide this if they don't care, but let's let them edit
    projectIdea: initialData?.projectIdea || "",
    status: initialData?.status || "Applied",
    teamMembers: initialData?.teamMembers?.length
      ? initialData.teamMembers
      : [{ name: "" }],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSubmit = {
        hackathonId,
        teamName: formData.teamName,
        projectIdea: formData.projectIdea,
        status: formData.status,
        teamMembers: formData.teamMembers.filter((m: any) => m.name.trim() !== ""),
      };

      if (initialData?._id) {
        await updateTeam(initialData._id, dataToSubmit);
      } else {
        await createTeam(dataToSubmit);
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const addMember = () => {
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, { name: "" }],
    });
  };

  const updateMember = (index: number, field: string, value: string) => {
    const newMembers = [...formData.teamMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setFormData({ ...formData, teamMembers: newMembers });
  };

  const removeMember = (index: number) => {
    const newMembers = formData.teamMembers.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, teamMembers: newMembers });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b-2 border-black bg-[#2979FF]">
          <h2 className="text-xl font-black text-white uppercase tracking-wider">
            {initialData ? "Edit Submission" : "Register Submission"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-white hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-colors"
          >
            <X className="size-5" strokeWidth={3} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-black text-black">Team / Project Name</label>
              <input
                required
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="w-full border-2 border-black p-2.5 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                placeholder="e.g. Byte Brigade"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-black text-black">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border-2 border-black p-2.5 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-white appearance-none"
              >
                <option value="Applied">Applied</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Finalist">Finalist</option>
                <option value="Won">Won</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-black text-black">Project Idea</label>
            <textarea
              required
              rows={3}
              value={formData.projectIdea}
              onChange={(e) => setFormData({ ...formData, projectIdea: e.target.value })}
              className="w-full border-2 border-black p-2.5 text-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow resize-none"
              placeholder="Describe your hackathon project..."
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-black text-black">Team Members</label>
              <button
                type="button"
                onClick={addMember}
                className="inline-flex items-center gap-1 text-xs font-black uppercase bg-[#FFE600] px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Plus className="size-3" strokeWidth={3} /> Add
              </button>
            </div>
            
            <datalist id="teammates">
              {uniqueTeamMembers.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>

            {formData.teamMembers.map((member: any, index: number) => (
              <div key={index} className="flex items-start gap-2">
                <div className="flex-1 space-y-1.5">
                  <input
                    required
                    type="text"
                    list="teammates"
                    value={member.name}
                    onChange={(e) => updateMember(index, "name", e.target.value)}
                    className="w-full border-2 border-black p-2 text-sm text-black font-medium focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                    placeholder="Name"
                  />
                </div>
                {formData.teamMembers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="p-2 bg-[#FF3B30] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <Trash2 className="size-4" strokeWidth={2} />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="pt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white font-black uppercase tracking-widest py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Submission"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
