import mongoose, { Schema, type Document } from "mongoose";

export interface ITeamMember {
  name: string;
}

export interface ITeam extends Document {
  _id: mongoose.Types.ObjectId;
  hackathonId: mongoose.Types.ObjectId;
  teamName: string;
  teamMembers: ITeamMember[];
  projectIdea: string;
  status: "Applied" | "Shortlisted" | "Finalist" | "Won";
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
  },
  { _id: false }
);

const TeamSchema = new Schema<ITeam>(
  {
    hackathonId: {
      type: Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },
    teamName: { type: String, required: true },
    teamMembers: { type: [TeamMemberSchema], required: true },
    projectIdea: { type: String, required: true },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Finalist", "Won"],
      default: "Applied",
    },
  },
  {
    timestamps: true,
  }
);

export const Team =
  mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);
