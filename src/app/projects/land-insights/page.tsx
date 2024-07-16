import Header from "@/components/header/header";
import FullWidthLink from "@/components/links/fullWidthLink";
import { Link } from "@/components/links/links";
import React from "react";

const links: Link[] = [
  {
    title: "SurveyHub",
    desc: "All in one app for creating, storing, validating and submitting survey plans",
    url: "/projects/surveyhub",
  },
  {
    title: "Parcel Checker",
    desc: "Saving time and money with an automated parcel map check",
    url: "/projects/parcel-check",
  },
];

const LandInsights = () => {
  return (
    <main className="max-w-2xl mx-auto min-h-screen text-white">
      <Header></Header>
      <section className="mb-6">
        <h1 className="text-2xl font-bold">Land Insights 🔍</h1>
        <p className="mt-6">
          I've had the pleasure of working on some exciting and innovative
          projects at Silvacom. My proudest achievement so far is seeing an app
          I helped develop being showcased at one of the 2023 ESRI user
          conference plenary sessions!
        </p>
      </section>
      <section>
        <h2 className="text-xl font-bold">More Projects 👇</h2>
        {links.map((linkItem, index) => (
          <FullWidthLink key={index} {...linkItem}></FullWidthLink>
        ))}
      </section>
    </main>
  );
};

export default LandInsights;
