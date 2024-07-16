import Header from "@/components/header/header";
import FullWidthLink from "@/components/links/fullWidthLink";
import { Link } from "@/components/links/links";
import React from "react";
import Image from "next/image";

const links: Link[] = [
  {
    title: "Parcel Checker",
    desc: "Saving time and money with an automated parcel map check",
    url: "/projects/parcel-check",
  },
  // {
  //   title: "Land Insights",
  //   desc: "View land records across Orange County",
  //   url: "/projects/land-insights",
  // },
];

const SurveyHub = () => {
  return (
    <main className="max-w-2xl mx-auto min-h-screen text-white">
      <Header></Header>
      <section className="mb-6">
        <section className="w-full"></section>
        <section>
          <h1 className="text-2xl font-bold mt-3">SurveyHub</h1>
          <p className="mt-6">
            Survey plan submission is a long and confusing process with many
            factors to consider for a multitude of different plan types. To help
            speed up the process and prevent simple mistakes, we built SurveyHub
            for British Columbia's LTSA.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold mt-8">What Does It Do?</h2>
          <p className="mt-3">
            SurveyHub can be considered an all-in-one survey plan submission
            tool. From the beginning of the process, surveyors can use the
            system as a file folder to organize their plans. I built a map that
            allows surveyors to group plans for a project in a geographic area.
            Plans are allowed to have multiple variations are changes are made.
            This allows surveyors to keep track of their plan as they create it.
          </p>

          <p className="mt-3">
            Once a plan has passed all automated verification checks, surveyors
            can send the plan to receive signatures from lawyers right in the
            app. Once signed, the plan comes right back into the app for
            certification
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold mt-8">Design and Development</h2>
          <p className="mt-3">
            I started working on SurveyHub before most of the Silvacom team as a
            design consultant. We had many rounds of design and architecture
            discussion. Some of the biggest challenges were coming up with
            solutions for the huge amount of variability in different plan types
            and desiging how the api architecture will work.
          </p>
          <p className="mt-3">
            After the design stage, an agile development team was created. I
            started working on a design system and component library that was to
            be developed for use in other LTSA apps alongside SurveyHub's
            development. We used Angular, Tailwind, and Java.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold mt-3">Results</h2>
          <p className="mt-3">
            After 2 years of 2 week sprints on a 10+ member team, we shipped
            SurveyHub to production with glowing reviews from surveyors, a fully
            fledged component library was built, and a new design system was
            successfully implemented
          </p>
        </section>
      </section>
      <section>
        <h2 className="text-xl font-bold mt-12">More Projects 👇</h2>
        {links.map((linkItem, index) => (
          <FullWidthLink key={index} {...linkItem}></FullWidthLink>
        ))}
      </section>
    </main>
  );
};

export default SurveyHub;
