import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { ReservationProvider } from "@/components/site/ReservationContext";
import { ReservationModal } from "@/components/site/ReservationModal";
import { CurtainReveal } from "@/components/site/CurtainReveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { WhatsAppChatButton } from "@/components/site/WhatsAppChatButton";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { GlobalAuthModal } from "@/components/site/GlobalAuthModal";
import { GlobalOnboardingModal } from "@/components/site/GlobalOnboardingModal";
import { DashboardDrawer } from "@/components/site/DashboardDrawer";
import { GlobalPhoneVerificationModal } from "@/components/site/GlobalPhoneVerificationModal";
import { RecentActivityPopup } from "@/components/site/RecentActivityPopup";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
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
      { title: "Learn & Shine" },
      {
        name: "description",
        content:
          "Making college students industry-ready since day one. Live workshops, real mentors, 5 mentoring tracks.",
      },
      { name: "author", content: "Learn & Shine" },
      { property: "og:title", content: "Learn & Shine" },
      {
        property: "og:description",
        content: "Stop hoping you'll figure it out. Start training for the job you actually want.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Learn & Shine" },
      { name: "twitter:description", content: "Stop hoping. Start training." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function GlobalLoginTrigger() {
  const { user, loading, setShowLoginModal } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      const timer = setTimeout(() => {
        setShowLoginModal(true);
      }, 7000);
      return () => clearTimeout(timer);
    } else {
      setShowLoginModal(false);
    }
  }, [user, loading, setShowLoginModal]);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalLoginTrigger />
        <ReservationProvider>
          {/* Animated Soothing Aurora Blobs */}
          <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden select-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-[#E0C3FC]/30 blur-3xl" />
            <div
              className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] max-w-[700px] rounded-full bg-[#8EC5FC]/30 blur-3xl"
            />
            <div
              className="absolute top-[35%] left-[25%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-[#F8EDEB]/50 blur-3xl"
            />
          </div>
          <CurtainReveal />
          <ScrollProgress />
          <WhatsAppChatButton />
          <Outlet />
          <ReservationModal />
          <GlobalAuthModal />
          <GlobalOnboardingModal />
          <GlobalPhoneVerificationModal />
          <RecentActivityPopup />
        </ReservationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
