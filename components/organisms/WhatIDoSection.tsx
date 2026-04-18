"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/atoms/SectionLabel";

interface RoleArea {
  heading: string;
  bullets: string[];
}

interface Role {
  num: string;
  title: string;
  org: string;
  description?: string;
  areas?: RoleArea[];
}

const roles: Role[] = [
  {
    num: "01",
    title: "Junior Program Officer",
    org: "School of Collective Intelligence · UM6P, Morocco",
    areas: [
      {
        heading: "Event Coordination",
        bullets: [
          "Collaborating with faculty to design agendas and coordinate logistics for SCI Talks and seminars.",
          "Building partnerships with departments and student clubs for cross-institutional initiatives.",
          "Representing the school at job fairs and student-oriented events.",
        ],
      },
      {
        heading: "Student Engagement",
        bullets: [
          "Guiding new students during orientation and providing career support.",
          "Assisting with internship applications, CV reviews, and interview prep.",
        ],
      },
    ],
  },
  {
    num: "02",
    title: "Mentor",
    org: "Personal Ministry",
    description:
      "Walking alongside individuals navigating questions of purpose, leadership, and identity. This is a personal investment in others—giving back what was once given to me.",
  },
  {
    num: "03",
    title: "Group Intelligence Facilitator",
    org: "Practitioner",
    description:
      "Applying the science of collective intelligence to help groups surface diverse perspectives, resolve complexity, and make decisions that reflect a shared wisdom.",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 }
  },
};

const itemVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export function WhatIDoSection() {
  return (
    <section id="what-i-do" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>What I Do</SectionLabel>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-light leading-tight mb-6">
            Serving Across<br /><em className="serif italic">Three Spheres</em>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Technology. Leadership. Transformation. Each role I undertake is an expression of the same 
            conviction: that a life worth living is one shared in service to others.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {roles.map((role) => (
            <motion.div
              key={role.num}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-shadow"
            >
              <span className="text-xs font-mono text-primary mb-4 block">
                [{role.num}]
              </span>
              <h3 className="text-2xl font-bold mb-1">{role.title}</h3>
              <div className="text-sm text-muted-foreground mb-6 uppercase tracking-wider font-semibold">
                {role.org}
              </div>

              {role.areas ? (
                <div className="space-y-6">
                  {role.areas.map((area) => (
                    <div key={area.heading}>
                      <h4 className="font-bold text-sm mb-2 text-foreground underline decoration-primary/30">
                        {area.heading}
                      </h4>
                      <ul className="space-y-2">
                        {area.bullets.map((b, j) => (
                          <motion.li 
                            key={j} 
                            variants={itemVariants}
                            className="text-sm text-muted-foreground list-disc ml-4"
                          >
                            {b}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground leading-relaxed italic">
                  "{role.description}"
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}