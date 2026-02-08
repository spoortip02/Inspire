import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  const { url } = await req.json().catch(() => ({ url: "" }));

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        // Helps some sites return normal HTML
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari",
      },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const ogTitle =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      "";

    let ogImage =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      "";

    // Make relative og:image absolute
    if (ogImage && ogImage.startsWith("/")) {
      const u = new URL(url);
      ogImage = `${u.origin}${ogImage}`;
    }

    return NextResponse.json({
      title: ogTitle.trim(),
      image: ogImage.trim(),
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to fetch preview", details: e?.message },
      { status: 500 }
    );
  }
}
