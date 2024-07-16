import Header from "@/components/header/header";
import FullWidthLink from "@/components/links/fullWidthLink";
import { Link } from "@/components/links/links";
import React from "react";
import Image from "next/image";

import esriconf from "../../../../public/esriconf.jpg";
import parcelcheck from "../../../../public/parcelcheck.png";

const links: Link[] = [
  {
    title: "SurveyHub",
    desc: "All in one app for creating, storing, validating and submitting survey plans",
    url: "/projects/surveyhub",
  },
  // {
  //   title: "Land Insights",
  //   desc: "View land records across Orange County",
  //   url: "/projects/land-insights",
  // },
];

const ParcelChecker = () => {
  return (
    <main className="max-w-2xl mx-auto min-h-screen text-white">
      <Header></Header>
      <section className="mb-6">
        <section className="w-full">
          <Image
            className="rounded-lg object-cover col-span-2 h-full"
            src={parcelcheck}
            alt="Orange County Public Works presenting an app I created with them at the Esri User Conference"
          />
        </section>
        <section>
          <h1 className="text-2xl font-bold mt-3">Parcel Checker</h1>
          <p className="mt-6">
            Getting a map checked by the county was an expensive and time
            consuming process. Surveyors were in desperate need of a way to
            validate their map for simple mistakes that wasted hours and
            hundreds of dollars. Orange County Public Works envisioned Parcel
            Checker as a solution. Working together, we created an ESRI User
            Conference plenary worthy solution.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold mt-8">What Does It Do?</h2>
          <p className="mt-3">
            Parcel Checker takes the map check process and completely automates
            it. Surveyors upload their CAD drawing of a parcel where it gets
            read by AutoCAD's Design Automation API. Some quick calculations
            return a full report of the uploaded CAD. That data gets placed in a
            large table where users can see which polylines are not up to spec.
            Need to know what's failing? Click on the failing polyline and the
            built in ArcGIS JS map will show you what you're looking at. You can
            also see it right on your CAD drawing thanks to the AutoCAD Forge
            Viewer.
          </p>

          <p className="mt-3">
            Basic details are displayed in the sidebar for a quick sanity check.
            Surveyors can also see the Metes and Bounds description of each
            parcel and an exportable report lets users take their work out of
            the app if needed.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold mt-8">Design and Development</h2>
          <p className="mt-3">
            I started working on Parcel Checker very quickly after joining the
            Silvacom team. I inherited a great design and a basic React app.
            After implementing the basic mapping and data visualization
            features, OCPW saw an even greater vision for the app. I swapped
            between designer and developer as we would do a design workshop
            together, and I would take the results and implement them into the
            app.
          </p>
        </section>
        <section>
          <Image
            className="rounded-lg object-cover col-span-2 w-full mt-8"
            src={esriconf}
            alt="Orange County Public Works presenting an app I created with them at the Esri User Conference"
          />
          <h2 className="text-xl font-bold mt-3">Results</h2>
          <p className="mt-3">
            Parcel Checker recieved rave reviews from the internal surveyor
            testing group. After a few rounds of testing, the internal version
            of the app was considered complete. I handed off development of the
            app to go start our next project Land Insights. The app was featured
            in Orange County's presentation at the 2023 ESRI User Conference.
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

export default ParcelChecker;
