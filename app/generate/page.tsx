// app/generate/page.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

export default function GeneratePage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function generateBlog() {
    if (!keyword) return;
    setLoading(true);
    setResult(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-800">
          🇵🇰 AI Blog Generator for GeoNewsLive
        </h1>
        <div className="flex gap-4 mb-6">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter a topic like 'PIA privatization'"
          />
          <Button onClick={generateBlog} disabled={loading} className="bg-green-700 hover:bg-green-800">
            {loading ? <LoaderCircle className="animate-spin" /> : "Generate"}
          </Button>
        </div>
        {result && (
          <Card className="bg-white shadow-xl">
            <CardContent className="prose max-w-none mt-4" dangerouslySetInnerHTML={{ __html: result.html }} />
          </Card>
        )}
      </div>
    </div>
  );
}
