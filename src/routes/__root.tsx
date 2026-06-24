import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChatWidget } from "@/components/chat-widget";
import { PromoBanner } from "@/components/promo-banner";
import { CursorGlow } from "@/components/cursor-glow";

import { I18nProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-gold">۴۰۴</h1>
        <h2 className="mt-4 text-xl font-semibold">صفحه پیدا نشد</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          صفحه‌ای که دنبالش هستید وجود ندارد یا منتقل شده است.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">صفحه بارگذاری نشد</h1>
        <p className="mt-2 text-sm text-muted-foreground">یک خطا رخ داد. می‌توانید دوباره تلاش کنید.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">تلاش مجدد</button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-sm">خانه</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ATiLLAi | استودیو هوش مصنوعی و علم داده" },
      { name: "description", content: "ATiLLAi — مرجع تخصصی مشاوره و اجرای پروژه‌های دانشجویی، صنعتی و دانشگاهی در زمینه آمار، هوش مصنوعی، یادگیری ماشین و یادگیری عمیق." },
      { name: "author", content: "ATiLLAi" },
      { property: "og:site_name", content: "ATiLLAi" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "ATiLLAi | استودیو هوش مصنوعی و علم داده" },
      { name: "twitter:title", content: "ATiLLAi | استودیو هوش مصنوعی و علم داده" },
      { property: "og:description", content: "ATiLLAi — مرجع تخصصی مشاوره و اجرای پروژه‌های دانشجویی، صنعتی و دانشگاهی در زمینه آمار، هوش مصنوعی، یادگیری ماشین و یادگیری عمیق." },
      { name: "twitter:description", content: "ATiLLAi — مرجع تخصصی مشاوره و اجرای پروژه‌های دانشجویی، صنعتی و دانشگاهی در زمینه آمار، هوش مصنوعی، یادگیری ماشین و یادگیری عمیق." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/VWpt2vj2zteIFyKQbOqleuiKoc03/social-images/social-1780917278939-ChatGPT_Image_Jun_7,_2026,_03_02_33_PM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/VWpt2vj2zteIFyKQbOqleuiKoc03/social-images/social-1780917278939-ChatGPT_Image_Jun_7,_2026,_03_02_33_PM.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&family=Noto+Sans+Arabic:wght@400;600;700&family=Orbitron:wght@500;700;800;900&family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600;700&family=Montserrat:wght@300;400;500&display=swap" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ATiLLAi",
        url: "https://atil-ai-hub.lovable.app",
        description: "ATiLLAi — استودیو تخصصی مشاوره و اجرای پروژه‌های هوش مصنوعی، یادگیری ماشین و آمار.",
      }),
    }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="pointer-events-none fixed inset-0 -z-10 bg-aurora opacity-80" />
          <div className="pointer-events-none fixed inset-0 -z-10 [background-image:radial-gradient(oklch(1_0_0/0.06)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <CursorGlow />
          <SiteHeader />
          <main>
            <Outlet />
          </main>
          <SiteFooter />
          <ChatWidget />
          <PromoBanner />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}
