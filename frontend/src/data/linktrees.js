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
