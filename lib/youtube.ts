// lib/youtube.ts

const CHANNEL_ID = "UC_vt34wimdCzdkrzVejwX9g"; // Geo News official channel

export async function getTranscript() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&order=date&key=${apiKey}`;

  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();

  const videoId =
    searchData.items?.[0]?.id?.videoId ||
    (() => {
      throw new Error("No livestream video found.");
    })();

  const transcriptUrl = `https://video.google.com/timedtext?lang=en&v=${videoId}`;
  const transcriptRes = await fetch(transcriptUrl);
  const transcriptXml = await transcriptRes.text();

  const matches = [...transcriptXml.matchAll(/<text.+?>(.*?)<\/text>/g)];
  const transcript = matches.map((m) => decodeHTMLEntities(m[1])).join(". ");

  return transcript;
}

function decodeHTMLEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
