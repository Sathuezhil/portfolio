import { profile, siteCopy, type SiteContent } from "@/data/content";

export function defaultSiteContent(): SiteContent {
  return {
    profile: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      fullName: profile.fullName,
      role: profile.role,
      headline: profile.headline,
      location: profile.location,
      email: profile.email,
      phone: profile.phone,
      phoneHref: profile.phoneHref,
      availability: profile.availability,
    },
    copy: { ...siteCopy },
  };
}

export function normalizeContent(input: Partial<SiteContent> | null | undefined): SiteContent {
  const defaults = defaultSiteContent();
  const next: SiteContent = {
    profile: { ...defaults.profile, ...input?.profile },
    copy: { ...defaults.copy, ...input?.copy },
  };

  const digits = (next.profile.phone ?? "").replace(/\D+/g, "");
  next.profile.fullName = `${next.profile.firstName} ${next.profile.lastName}`.trim();
  next.profile.phoneHref = digits ? `tel:+${digits}` : next.profile.phoneHref;

  return next;
}
