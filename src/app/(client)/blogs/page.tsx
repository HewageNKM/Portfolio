import { Metadata } from "next";
import Script from "next/script";

import { BlogService } from "@/services/BlogService";
import BlogsClient from "./BlogsClient";

/* -------------------------------------------------------------------------- */
/*                                SEO METADATA                                */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL("https://hewagenkm.com"),
  title: "Blogs | NKM Hewage",
  description:
    "Read insightful articles and updates by Nadun Malwenna on software development, web technologies, engineering practices, and real-world coding experience.",
  keywords: [
    "blog",
    "tech blog",
    "software engineering articles",
    "coding blog",
    "nextjs blog",
    "web development blog",
    "nadun malwenna blog",
  ],
  alternates: {
    canonical: "https://hewagenkm.com/blogs",
  },
  openGraph: {
    title: "Blogs | NKM Hewage",
    description: "Insights and articles by Nadun Malwenna.",
    url: "https://hewagenkm.com/blogs",
    images: [
      {
        url: "https://hewagenkm.com/og-blogs.png",
        width: 1200,
        height: 630,
        alt: "Blogs - NKM Hewage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | NKM Hewage",
    description: "Read articles and insights by Nadun Malwenna.",
    images: ["https://hewagenkm.com/og-blogs.png"],
  },
};

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const { data, totalPages } = await BlogService.getBlogs(page, 9);

  // Format blog data for schema
  const blogPostsSchema = data.map((b: any) => ({
    "@type": "BlogPosting",
    headline: b.title,
    description: b.summary,
    url: `https://hewagenkm.com/blogs/${b.slug ?? b.id}`,
    datePublished: b.createdAt,
    author: {
      "@type": "Person",
      name: "NKM Hewage (Nadun Malwenna)",
    },
    image: b.coverImage || "https://hewagenkm.com/og-blogs.png",
  }));

  return (
    <>
      {/* ---------------------------------------------------------------------- */}
      {/*                            STRUCTURED DATA                             */}
      {/* ---------------------------------------------------------------------- */}

      {/* Blog Schema */}
      <Script
        id="schema-blog-list"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "NKM Hewage Blog",
            url: "https://hewagenkm.com/blogs",
            description:
              "A collection of articles, insights, and software engineering content by Nadun Malwenna.",
            blogPost: blogPostsSchema,
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="schema-blog-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://hewagenkm.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blogs",
                item: "https://hewagenkm.com/blogs",
              },
            ],
          }),
        }}
      />

      {/* Enable Sitelinks Search Box */}
      <Script
        id="schema-blog-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "NKM Hewage Portfolio",
            url: "https://hewagenkm.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://hewagenkm.com/blogs?s={search_term}",
              "query-input": "required name=search_term",
            },
          }),
        }}
      />

      {/* ---------------------------------------------------------------------- */}
      {/*                               PAGE RENDER                              */}
      {/* ---------------------------------------------------------------------- */}

      <main className="max-w-7xl mx-auto px-4 py-10">
        <BlogsClient
          initialBlogs={data.map((b: any) => ({
            id: b.id,
            title: b.title,
            summary: b.summary,
            date: b.createdAt || "",
            tags: b.tags,
          }))}
          totalPages={totalPages}
          currentPage={page}
        />
      </main>
    </>
  );
}
