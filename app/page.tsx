"use client";
import { useState } from "react";

const animeList = [
  { title: "Атака титанов", rating: 9.0, year: 2013, image: "/1.jpg" },
  { title: "Клинок, рассекающий демонов", rating: 8.7, year: 2019, image: "/2.jpg" },
  { title: "Магическая битва", rating: 8.6, year: 2020, image: "/3.jpg" },
  { title: "Ван-Пис", rating: 8.9, year: 1999, image: "/4.jpg" },
  { title: "Наруто", rating: 8.4, year: 2002, image: "/5.jpg" },
  { title: "Тетрадь смерти", rating: 8.6, year: 2006, image: "/6.jpg" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = animeList
  .filter((anime) =>
    anime.title.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    const aStarts = a.title.toLowerCase().startsWith(search.toLowerCase());
    const bStarts = b.title.toLowerCase().startsWith(search.toLowerCase());
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Шапка */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 relative">
        <h1 className="text-3xl font-bold text-orange-500">ANIMEXO</h1>

        {/* Контейнер поиска */}
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

          {/* Выпадающий список */}
          {isOpen && search.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden shadow-2xl z-50">
              {suggestions.length > 0 ? (
                suggestions.map((anime, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearch(anime.title);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-800 cursor-pointer"
                  >
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{anime.title}</p>
                      <p className="text-xs text-zinc-400">{anime.year} • ★ {anime.rating}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="px-3 py-3 text-sm text-zinc-500">
                  Ничего не найдено
                </p>
              )}
            </div>
          )}
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
          Войти
        </button>
      </header>

      {/* Сетка аниме */}
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-6">Популярное аниме</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-3">
          {animeList.map((anime, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="aspect-[2/3] overflow-hidden relative">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-orange-400 px-2 py-1 rounded font-bold text-sm">
                  {anime.rating}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-2">{anime.title}</h3>
                <p className="text-zinc-400 text-xs mt-1">{anime.year}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}