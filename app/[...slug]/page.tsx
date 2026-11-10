import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Lazy } from "@/components/Lazy";
import { MapView } from "@/components/MapView";
import { PRView } from "@/components/PRView";
import { PullList } from "@/components/PullList";
import { RepoTabs } from "@/components/RepoTabs";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { TimelapseView } from "@/components/TimelapseView";
import { parseSegments, routePath, safeDecode, type Route } from "@/lib/route";

interface Props {
  params: Promise<{ slug: string[] }>;
}

function describe(route: Route): { title: string; description: string } {
  const name = `${route.owner}/${route.repo}`;
  if (route.kind === "pr") {
    return {
      title: `${name} #${route.number}`,
      description: `The blast radius of pull request #${route.number} in ${name}: what it changes, what imports it and what to review first.`,
    };
  }
  if (route.kind === "commit") {
    const sha = route.sha.slice(0, 7);
    return { title: `${name} ${sha}`, description: `The blast radius of commit ${sha} in ${name}: what it changes and what imports it.` };
  }
  if (route.kind === "compare") {
    return { title: `${name} ${route.head}`, description: `The blast radius of ${route.head} in ${name}, before it becomes a pull request.` };
  }
  if (route.view === "timelapse") return { title: `${name} time-lapse`, description: `Watch ${name} grow from its first commit to today, and see what breaks if a file changes.` };
  if (route.view === "pulls") return { title: `${name} pull requests`, description: `See the blast radius of any open pull request in ${name}.` };
  return { title: `${name} blast map`, description: `What breaks if a file in ${name} changes, and how the repository grew from its first commit to today.` };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = parseSegments((await params).slug);
  if (!route) return {};
  const path = routePath(route);
  const images = [{ url: `/api/og?path=${encodeURIComponent(path)}`, width: 1200, height: 630 }];
  const meta = describe(route);
  return {
    ...meta,
    alternates: { canonical: path },
    openGraph: { ...meta, url: path, images },
    twitter: { card: "summary_large_image", ...meta, images },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const route = parseSegments(slug);
  if (!route) notFound();
  const canonical = routePath(route);
  if (`/${slug.map((s) => encodeURIComponent(safeDecode(s))).join("/")}` !== canonical && `/${slug.map(safeDecode).join("/")}` !== canonical) redirect(canonical);

  return (
    <>
      <SiteHeader />
      <main className="alt">
        <div className="wrap">
          {route.kind === "repo" ? (
            <>
              <div className="crumbs repo-crumbs">
                <span>{route.owner}</span>
                <span className="sep">/</span>
                <b style={{ color: "var(--text)", fontWeight: 600 }}>{route.repo}</b>
              </div>
              <RepoTabs owner={route.owner} repo={route.repo} view={route.view} />
              {route.view === "pulls" ? (
                <PullList owner={route.owner} repo={route.repo} />
              ) : route.view === "timelapse" ? (
                <>
                  <TimelapseView owner={route.owner} repo={route.repo} />
                  <Lazy label="Show the blast map">
                    <MapView owner={route.owner} repo={route.repo} secondary />
                  </Lazy>
                </>
              ) : (
                <>
                  <MapView owner={route.owner} repo={route.repo} focus={route.focus} />
                  <Lazy label="Show the time-lapse">
                    <TimelapseView owner={route.owner} repo={route.repo} secondary />
                  </Lazy>
                </>
              )}
            </>
          ) : (
            <PRView route={route} />
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
