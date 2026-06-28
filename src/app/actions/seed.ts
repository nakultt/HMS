"use server";

import { connectDB } from "@/lib/db";
import { Hackathon } from "@/lib/models/hackathon";
import { Team } from "@/lib/models/team";

export async function seedDatabase() {
  await connectDB();

  // Clear existing data
  await Hackathon.deleteMany({});
  await Team.deleteMany({});

  // Create hackathons
  const hackathons = await Hackathon.insertMany([
    {
      name: "Odoo x KAHE Coimbatore Hackathon",
      location: "KAHE Campus, Coimbatore, Tamil Nadu",
      lastRegistrationDate: new Date("2026-07-15"),
      nextRoundResultDate: new Date("2026-07-25"),
    },
    {
      name: "Caterpillar Tech Challenge",
      location: "Caterpillar India, Chennai",
      lastRegistrationDate: new Date("2026-08-01"),
      nextRoundResultDate: new Date("2026-08-20"),
    },
    {
      name: "Innovsense 2026",
      location: "IIT Madras Research Park, Chennai",
      lastRegistrationDate: new Date("2026-09-10"),
      nextRoundResultDate: new Date("2026-09-30"),
    },
  ]);

  // Create teams for each hackathon
  const teamsData = [
    // Odoo x KAHE
    {
      hackathonId: hackathons[0]._id,
      teamName: "Code Crusaders",
      teamMembers: [
        { name: "Arjun Krishnan", role: "Team Lead & Backend Developer" },
        { name: "Priya Sharma", role: "Frontend Developer" },
        { name: "Rahul Menon", role: "UI/UX Designer" },
      ],
      projectIdea:
        "An AI-powered inventory management module for Odoo ERP that uses computer vision to automatically track and categorize warehouse items in real-time. The system integrates with existing Odoo workflows and provides predictive restocking alerts based on historical consumption patterns.",
      status: "Applied" as const,
    },
    {
      hackathonId: hackathons[0]._id,
      teamName: "Byte Brigade",
      teamMembers: [
        { name: "Sneha Reddy", role: "Team Lead & Full-Stack Developer" },
        { name: "Vikram Patel", role: "Machine Learning Engineer" },
        { name: "Kavya Nair", role: "Data Analyst" },
        { name: "Arun Kumar", role: "DevOps Engineer" },
      ],
      projectIdea:
        "A smart customer engagement platform built on Odoo that leverages NLP to analyze customer feedback across multiple channels (email, chat, social media) and automatically generates actionable insights for sales and support teams.",
      status: "Shortlisted" as const,
    },
    {
      hackathonId: hackathons[0]._id,
      teamName: "Debug Dynasty",
      teamMembers: [
        { name: "Meera Iyer", role: "Team Lead & Backend Developer" },
        { name: "Siddharth Jain", role: "Frontend Developer" },
      ],
      projectIdea:
        "A real-time supply chain visibility dashboard for Odoo that integrates IoT sensor data with ERP modules to provide end-to-end tracking of goods from manufacturer to customer, including carbon footprint calculations.",
      status: "Applied" as const,
    },

    // Caterpillar Tech Challenge
    {
      hackathonId: hackathons[1]._id,
      teamName: "Iron Circuit",
      teamMembers: [
        { name: "Deepak Rao", role: "Team Lead & Embedded Systems Engineer" },
        { name: "Ananya Singh", role: "Computer Vision Specialist" },
        { name: "Karthik Subramaniam", role: "Backend Developer" },
      ],
      projectIdea:
        "A predictive maintenance system for heavy machinery that uses vibration analysis, thermal imaging, and acoustic sensors to detect equipment failures up to 72 hours before they occur. The system communicates with fleet management software via a REST API.",
      status: "Finalist" as const,
    },
    {
      hackathonId: hackathons[1]._id,
      teamName: "Torque Titans",
      teamMembers: [
        { name: "Ravi Chandran", role: "Team Lead & Robotics Engineer" },
        { name: "Divya Lakshmi", role: "AI/ML Developer" },
        { name: "Nikhil Verma", role: "Cloud Architect" },
        { name: "Pooja Gupta", role: "Mobile Developer" },
      ],
      projectIdea:
        "An autonomous site surveying drone system that generates 3D terrain maps and provides real-time volumetric analysis for construction sites. Integrates with CAT's existing fleet management ecosystem and provides API endpoints for equipment routing optimization.",
      status: "Applied" as const,
    },

    // Innovsense 2026
    {
      hackathonId: hackathons[2]._id,
      teamName: "Neural Nexus",
      teamMembers: [
        { name: "Aditya Bhatt", role: "Team Lead & Research Scientist" },
        { name: "Shreya Kapoor", role: "Full-Stack Developer" },
        { name: "Harish Venkatesh", role: "Data Engineer" },
      ],
      projectIdea:
        "A federated learning platform for healthcare that enables hospitals to collaboratively train diagnostic AI models without sharing patient data. The system uses differential privacy and secure multi-party computation to ensure HIPAA compliance while improving model accuracy.",
      status: "Won" as const,
    },
    {
      hackathonId: hackathons[2]._id,
      teamName: "Quantum Quokkas",
      teamMembers: [
        { name: "Lakshmi Narayanan", role: "Team Lead & Quantum Computing Researcher" },
        { name: "Akash Mehta", role: "Software Developer" },
        { name: "Ritika Das", role: "UX Researcher" },
      ],
      projectIdea:
        "A quantum-inspired optimization engine for urban traffic management that reduces average commute times by up to 35%. The solution uses hybrid quantum-classical algorithms to process real-time traffic sensor data and dynamically adjust signal timing across city-wide intersections.",
      status: "Finalist" as const,
    },
    {
      hackathonId: hackathons[2]._id,
      teamName: "Cyber Sentinels",
      teamMembers: [
        { name: "Varun Malhotra", role: "Team Lead & Security Researcher" },
        { name: "Ishaan Prakash", role: "Backend Developer" },
      ],
      projectIdea:
        "A zero-trust network security framework that uses behavioral biometrics and continuous authentication to protect enterprise IoT deployments. The system adapts security policies in real-time based on threat intelligence feeds and anomaly detection.",
      status: "Shortlisted" as const,
    },
  ];

  await Team.insertMany(teamsData);

  return {
    success: true,
    hackathonsCreated: hackathons.length,
    teamsCreated: teamsData.length,
  };
}
