import Header from "@/components/header/header";
import FullWidthLink from "@/components/links/fullWidthLink";
import { MiniLink } from "@/components/links/links";
import InlineLink from "@/components/links/miniLink";
import { Link } from "@/components/links/links";
import Image from "next/image";

import pfaff from "../../public/pfaff.jpg";
import esridev from "../../public/esridev.jpeg";
import esriconf from "../../public/esriconf.jpg";
import cats from "../../public/cats.jpeg";
import jensen from "../../public/jensen.jpg";
import sunoco from "../../public/sunoco.jpg";

export default function Home() {
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

  const miniLink: MiniLink = {
    text: "Silvacom Ltd.",
    url: "https://www.silvacom.com",
  };

  return (
    <main className="max-w-2xl mx-auto min-h-screen text-white">
      <Header></Header>
      <section className="mb-6">
        <h1 className="text-2xl font-bold">Howdy, I'm Kyle 👋</h1>
        <p className="mt-6">
          I'm a frontend developer, racing enthusiast, and Netflix superstar (3
          pixels of me are visible for 5 seconds in an episode of Drive to
          Survive). I build apps and maps at &nbsp;
          <InlineLink {...miniLink}></InlineLink> as a part of the Silvacom CS
          team. Together we have worked with Orange County Public Works and
          British Columbia's Landsure to solve real life problems for public and
          private surveyors as well as other GIS professionals.
        </p>

        <p></p>
      </section>
      <section className="grid grid-cols-3 gap-4 mb-6 auto-rows-fr grid-rows-[20rem_20rem_20rem]">
        <Image
          className="rounded-lg object-cover col-span-2 h-full"
          src={pfaff}
          alt="Me in front of the Pfaff Porsche GT3 car"
        />
        <Image
          className="rounded-lg object-cover h-full"
          src={esridev}
          alt="Me at the ESRI Developer Conference"
        />

        <Image
          className="rounded-lg object-cover h-full"
          src={sunoco}
          alt="Me at the ESRI Developer Conference"
        />
        <Image
          className="rounded-lg object-cover col-span-2 h-full"
          src={esriconf}
          alt="Orange County Public Works presenting an app I created with them at the Esri User Conference"
        />
        <Image
          className="rounded-lg object-cover col-span-2 h-full"
          src={cats}
          alt="My cats Bob and Michael"
        />
        <Image
          className="rounded-lg object-cover h-full"
          src={jensen}
          alt="Me in front of the Pfaff Porsche GT3 car"
        />
      </section>
      <section>
        <h2 className="text-xl font-bold">Check out some projects!</h2>
        {links.map((linkItem, index) => (
          <FullWidthLink key={index} {...linkItem}></FullWidthLink>
        ))}
      </section>
    </main>
  );
}
