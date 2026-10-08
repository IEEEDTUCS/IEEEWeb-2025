/**
 * Event linktree registry.
 *
 * To publish another event page, add an entry here. Its `slug` becomes the
 * public URL: https://www.ieeedtu.in/linktree/<slug>.
 * Add `eventLogo` when an event logo is available in /public; it will be shown
 * beneath the IEEE DTU logo. `icon` accepts one of: registration, whatsapp,
 * instagram, linkedin, website.
 */
const linktrees = {
  "ieee-day": {
    slug: "ieee-day",
    title: "IEEE Day 2026",
    description: "Celebrate innovation, community, and the spirit of IEEE with IEEE DTU.",
    eventLogo: "/event-logos/ieee-day.webp",
    accentColor: "#00629B",
    links: [
      {
        label: "Register for IEEE Day 2026",
        href: "https://ieeedtu.in/ieee-day/register",
        icon: "registration",
      },
      {
        label: "Join the WhatsApp community",
        href: "https://ieeedtu.in/ieee-day/wa",
        icon: "whatsapp",
      },
      {
        label: "Visit the IEEE DAY 2026 website",
        href: "https://ieeeday.ieeedtu.in",
        icon: "website",
      },
      {
        label: "Join IEEE DTU",
        href: "/IEEEDTU/join-us",
        icon: "registration",
      },
      {
        label: "Follow IEEE DTU",
        href: "https://www.instagram.com/ieee.dtu/",
        icon: "instagram",
      },
      {
        label: "Connect with IEEE DTU",
        href: "https://www.linkedin.com/company/ieee-dtu/",
        icon: "linkedin",
      },
      {
        label: "Visit the IEEE DTU website",
        href: "https://www.ieeedtu.in",
        icon: "website",
      },
    ],
  },
  "ieeextreme": {
    slug: "ieeextreme",
    title: "IEEEXTREME 20.0",
    description: "IEEEXtreme is a global challenge in which teams of IEEE Student members – advised and proctored by an IEEE member, and often supported by an IEEE Student Branch – compete in a 24-hour time span against each other to solve a set of programming problems.",
    eventLogo: "/event-logos/ieeextreme.png",
    accentColor: "#00629B",
    links: [
      {
        label: "Learn about IEEEXTREME",
        href: "https://ieeextreme.org/",
        icon: "website",
      },
      {
        label: "Join IEEE DTU to participate with us",
        href: "/IEEEDTU/join-us",
        icon: "registration",
      },
      {
        label: "Register for IEEEXTREME 20.0",
        href: "https://xtreme.vtools.ieee.org/",
        icon: "registration",
      },
      {
        label: "IEEE DTU's Team Registration Form",
        href: "https://docs.google.com/forms/d/136gDKgCwj0Grqdr317l6-ZRFf2sbAP0cBUeTdWvW9Nc/edit",
        icon: "registration",
      },
      {
        label: "Join the WhatsApp community",
        href: "https://chat.whatsapp.com/H3Tvb50HMlgHnaK12D8MKW",
        icon: "whatsapp",
      },
      {
        label: "Follow IEEE DTU",
        href: "https://www.instagram.com/ieee.dtu/",
        icon: "instagram",
      },
      {
        label: "Connect with IEEE DTU",
        href: "https://www.linkedin.com/company/ieee-dtu/",
        icon: "linkedin",
      },
      {
        label: "Visit the IEEE DTU website",
        href: "https://www.ieeedtu.in",
        icon: "website",
      },
    ],
  },
};

export function getLinktree(slug) {
  return linktrees[slug];
}

export default linktrees;
