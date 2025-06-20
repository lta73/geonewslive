// app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-yellow-100 text-green-900 p-4">
      <h1 className="text-4xl font-bold mb-4">🌍 Welcome to GeoNewsLive AI</h1>
      <p className="text-lg max-w-xl text-center">
        Use AI to generate insightful blog content from Geo News livestreams. 
        Head to <a href="/generate" className="text-green-700 underline">/generate</a> to begin!
      </p>
    </main>
  );
}
