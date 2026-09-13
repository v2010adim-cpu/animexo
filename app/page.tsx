"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [animeList, setAnimeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnime() {
      try {
        const res = await fetch("https://anilibria.top/api/v1/anime/catalog/releases?limit=24");
        const data = await res.json();
        setAnimeList(data.data || []);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAnime();
  }, []);

  const suggestions = animeList
    .filter((anime) => {
      const title = anime.name?.main || "";
      return title.toLowerCase().includes(search.toLowerCase());
    })
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 relative">
        <h1 className="text-3xl font-bold text-orange-500">ANIMEXO</h1>

        <div className="relative w-96">
          <input
            type="text"
            placeholder="Поиск аниме..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 150)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 w-full text-white"
          />

          {isOpen && search.length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shadow-2xl z-50">
              {suggestions.length > 0 ? (
                suggestions.map((anime, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearch(anime.name?.main || "");
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-800 cursor-pointer"
                  >
                    <img
                     src={anime.poster?.src ? `https://anilibria.top${anime.poster.src}` : "/1.jpg"}
                      alt={anime.name?.main || ""}
                      className="w-10 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{anime.name?.main}</p>
                      <p className="text-xs text-zinc-400">
                        {anime.year || "—"} • ★ {anime.rating?.score || "—"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="px-3 py-3 text-sm text-zinc-500">Ничего не найдено</p>
              )}
            </div>
          )}
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
          Войти
        </button>
      </header>

      <main className="p-8">
        <h2 className="text-2xl font-bold mb-6">Топ аниме</h2>

        {loading ? (
          <p className="text-zinc-400 text-center py-20">Загрузка...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-3">
            {animeList.map((anime, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="aspect-[2/3] overflow-hidden relative">
                  <img
                  src={anime.poster?.src ? `https://anilibria.top${anime.poster.src}` : "/1.jpg"}
                    alt={anime.name?.main || ""}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-orange-400 px-2 py-1 rounded font-bold text-sm">
                    {anime.rating?.score || "—"}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="font-semibold text-xs line-clamp-2">{anime.name?.main}</h3>
                  <p className="text-zinc-400 text-xs mt-1">
                    {anime.year || "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}