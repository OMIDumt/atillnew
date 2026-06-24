import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { PROJECTS } from "@/lib/projects-data";
import { APPS } from "@/lib/apps-data";
import { SERVICE_DETAILS } from "@/lib/services-data";

const BASE_URL = "https://atil-ai-hub.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/services", changefreq: "weekly", priority: "0.9" },
          { path: "/projects", changefreq: "weekly", priority: "0.9" },
          { path: "/apps", changefreq: "weekly", priority: "0.9" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/blog/machine-learning-project-ideas", changefreq: "monthly", priority: "0.7" },
        ];

        try {
          for (const p of PROJECTS) entries.push({ path: `/projects/${p.slug}`, changefreq: "monthly", priority: "0.7" });
        } catch {}
        try {
          for (const a of APPS) entries.push({ path: `/apps/${a.slug}`, changefreq: "monthly", priority: "0.7" });
        } catch {}
        try {
          for (const s of SERVICE_DETAILS) entries.push({ path: `/services/${s.slug}`, changefreq: "monthly", priority: "0.7" });
        } catch {}

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n")
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
