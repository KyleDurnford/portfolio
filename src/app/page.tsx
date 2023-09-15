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

export default function Home() {
  const links: Link[] = [
    {
      title: "Flight Journal",
      desc: "Display flight routes and travel info",
      url: "/maps/flight-journal",
    },
    {
      title: "Flight Journal",
      desc: "Display flight routes and travel info",
      url: "test2.ca",
    },
    {
      title: "Flight Journal",
      desc: "Display flight routes and travel info",
      url: "test2.ca",
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
          Survive). I build apps and maps at
          <InlineLink {...miniLink}></InlineLink> as a part of the Silvacom CS
          team. Together we have worked with Orange County Public Works and
          British Columbia's Landsure to solve real life problems for public and
          private surveyors as well as other GIS professionals.
        </p>

        <p></p>
      </section>
      <section className="grid grid-cols-3 gap-4 mb-6 auto-rows-fr">
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
        <div className="border">1</div>
        <Image
          className="rounded-lg object-cover col-span-2 h-full"
          src={esriconf}
          alt="Orange County Public Works presenting an app I created with them at the Esri User Conference"
        />
        <div className="border col-span-2">1</div>
        <Image
          className="rounded-lg object-cover h-full"
          src={cats}
          alt="My cats Bob and Michael"
        />
      </section>
      <section>
        <h2 className="text-xl font-bold">Check out some maps! 🌎🌍🌏</h2>
        {links.map((linkItem, index) => (
          <FullWidthLink key={index} {...linkItem}></FullWidthLink>
        ))}
      </section>
    </main>
  );
}
