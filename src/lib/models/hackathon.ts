import mongoose, { Schema, type Document } from "mongoose";

export interface IHackathon extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  location: string;
  lastRegistrationDate: Date;
  nextRoundResultDate: Date;
  nextStep?: string;
  eventLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HackathonSchema = new Schema<IHackathon>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    lastRegistrationDate: { type: Date, required: true },
    nextRoundResultDate: { type: Date, required: true },
    nextStep: { type: String, default: "" },
    eventLink: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Hackathon =
  mongoose.models.Hackathon ||
  mongoose.model<IHackathon>("Hackathon", HackathonSchema);
