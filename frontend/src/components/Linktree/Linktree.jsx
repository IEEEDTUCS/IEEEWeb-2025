import Image from "next/image";
import {
  ArrowUpRight,
  ClipboardPenLine,
  Globe2,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";

const icons = {
  registration: ClipboardPenLine,
  whatsapp: MessageCircle,
  instagram: Instagram,
  linkedin: Linkedin,
  website: Globe2,
};

export default function Linktree({ linktree }) {
  return (
    <main
      className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-[#f5f9fc] to-[#e8f1f7] px-5 py-8 font-[var(--font-heading)] max-[480px]:items-start max-[480px]:px-3 max-[480px]:py-4"
      style={{ "--linktree-accent": linktree.accentColor || "#00629B" }}
    >
      <section
        className="w-full max-w-[560px] rounded-[28px] border border-[rgb(0_65_105/10%)] bg-white/90 p-[22px] text-center shadow-[0_20px_55px_rgb(0_48_82/14%)] max-[480px]:rounded-[22px] max-[480px]:p-[20px_16px]"
        aria-labelledby="linktree-title"
      >
        <Image
          src="/IEEE_DTU_Logo.png"
          alt="IEEE DTU"
          width={182}
          height={102}
          priority
          className="mx-auto mb-1 block h-auto w-[min(160px,64%)] object-cover sm:w-[min(190px,64%)]"
        />

        {linktree.eventLogo && (
          <Image
            src={linktree.eventLogo}
            alt={`${linktree.title} logo`}
            width={112}
            height={112}
            priority
            className="mx-auto mb-3 block size-28 rounded-full border-4 border-white object-cover shadow-[0_7px_22px_rgb(0_48_82/19%)]"
          />
        )}
        <h1
          id="linktree-title"
          className="m-[12px_0_7px] text-[1.5rem] leading-[1.12] font-bold text-[#102d43] sm:text-[1.8rem] md:text-[2.15rem]"
        >
          {linktree.title}
        </h1>
        {linktree.description && (
          <p className="mx-auto max-w-[430px] text-sm leading-5 text-[#506574] sm:text-[0.98rem] sm:leading-6">
            {linktree.description}
          </p>
        )}

        <nav className="mt-5 grid gap-3" aria-label={`${linktree.title} links`}>
          {linktree.links.map((link) => {
            const Icon = icons[link.icon] || Globe2;
            const isExternal = /^https?:\/\//.test(link.href);

            return (
              <a
                className="grid min-h-[54px] grid-cols-[22px_1fr_22px] items-center rounded-[14px] border border-[rgb(17_70_104/15%)] bg-white px-3 py-2.5 text-left text-sm font-semibold text-[#17334a] no-underline shadow-[0_3px_8px_rgb(0_48_82/6%)] transition duration-150 hover:-translate-y-0.5 hover:border-[var(--linktree-accent)] hover:bg-[var(--linktree-accent)] hover:text-white hover:shadow-[0_8px_17px_color-mix(in_srgb,var(--linktree-accent)_28%,transparent)] focus-visible:outline-3 focus-visible:outline-[#f5b335] focus-visible:outline-offset-3 sm:min-h-[58px] sm:grid-cols-[25px_1fr_25px] sm:px-4 sm:py-[11px] sm:text-base"
                href={link.href}
                key={link.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon aria-hidden="true" size={20} strokeWidth={2} className="sm:size-[22px]" />
                <span className="px-3 text-center">{link.label}</span>
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} className="justify-self-end sm:size-[19px]" />
              </a>
            );
          })}
        </nav>

        <p className="mt-[22px] font-[var(--font-caption)] text-[0.7rem] leading-4 text-[#71818c] sm:text-xs sm:leading-5">
          IEEE DTU Student Branch · Delhi Technological University
        </p>
      </section>
    </main>
  );
}
