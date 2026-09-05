"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { profile as fallbackProfile, siteCopy as fallbackCopy, type SiteContent } from "@/data/content";
import { fetchSiteContent } from "./api";

const fallbackContent: SiteContent = {
  profile: {
    firstName: fallbackProfile.firstName,
    lastName: fallbackProfile.lastName,
    fullName: fallbackProfile.fullName,
    role: fallbackProfile.role,
    headline: fallbackProfile.headline,
    location: fallbackProfile.location,
    email: fallbackProfile.email,
    phone: fallbackProfile.phone,
    phoneHref: fallbackProfile.phoneHref,
    availability: fallbackProfile.availability,
  },
  copy: fallbackCopy,
};

const SiteContentContext = createContext<SiteContent>(fallbackContent);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(fallbackContent);

  useEffect(() => {
    fetchSiteContent()
      .then((next) => setContent(next))
      .catch(() => undefined);
  }, []);

  const value = useMemo(() => content, [content]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function mergeProfile(content: SiteContent) {
  return {
    ...fallbackProfile,
    ...content.profile,
    summary: content.copy.aboutSummary,
  };
}
