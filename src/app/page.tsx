// src/app/page.tsx
'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MEDIA_DATA, MediaItem, TAGS_BY_CATEGORY } from "@/data/mediaData";
import { useCartStore } from "@/store/useCartStore";

const SECTIONS = ["home", "manhwa", "books", "series", "movie"];

const THEME_CONFIG: Record<
  string,
  { bg: string; bgImage: string; rose: string; roseDeep: string; red: string }
> = {
  home: {
    bg: "#f1a9c8",
    bgImage: "url('/images/bg-manhwa.png')",
    rose: "#d4a5a5",
    roseDeep: "#b97f7f",
    red: "#c44a44",
  },
  manhwa: {
    bg: "#84174b",
    bgImage: "url('/images/bg-manhwa.png')",
    rose: "#d36fac",
    roseDeep: "#84174b",
    red: "#a8326a",
  },
  books: {
    bg: "#a855f7",
    bgImage: "url('/images/bg-books.png')",
    rose: "#c084fc",
    roseDeep: "#7e22ce",
    red: "#6b21a8",
  },
  series: {
    bg: "#3282b8",
    bgImage: "url('/images/bg-series.png')",
    rose: "#50aad4",
    roseDeep: "#1b4965",
    red: "#0f3044",
  },
  movie: {
    bg: "#db1212",
    bgImage: "url('/images/bg-movie.png')",
    rose: "#de5555",
    roseDeep: "#990000",
    red: "#7a0000",
  },
};

const PAGE_SIZE = 5;
const VISIBLE_TAGS = 18;

function Stars({ value }: { value: number }) {
  const norm = Math.min(5, Math.max(0, value > 5 ? value / 2 : value));
  return (
    <span className="stars" aria-label={`${value} out of 10`}>
      <span className="stars__fill" style={{ width: `${(norm / 5) * 100}%` }}>
        ★★★★★
      </span>
      ★★★★★
    </span>
  );
}

function Cover({ src, name }: { src: string | null; name: string }) {
  if (src) return <img className="cover" src={src} alt={`${name} cover`} loading="lazy" />;
  const hue = (name.length * 47) % 360;
  return (
    <div className="cover cover--placeholder" style={{ "--h": hue } as React.CSSProperties} role="img" aria-label={`${name} cover`}>
      {name.charAt(0)}
    </div>
  );
}

function pageList(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const keep = [...new Set([1, total, current, current - 1, current + 1])]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const out: (number | string)[] = [];
  keep.forEach((p, i) => {
    if (i && p - (keep[i - 1] as number) > 1) out.push("…" + p);
    out.push(p);
  });
  return out;
}

function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  return (
    <nav className="pager" aria-label="Pages">
      <button className="pager__btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
        prev
      </button>
      {pageList(page, totalPages).map((p, idx) =>
        typeof p === "string" ? (
          <span key={`gap-${idx}`} className="pager__gap">…</span>
        ) : (
          <button
            key={p}
            className={`pager__btn pager__num ${p === page ? "is-current" : ""}`}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        )
      )}
      <button className="pager__btn" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        next
      </button>
    </nav>
  );
}

export default function Home() {
  const reviews: MediaItem[] = MEDIA_DATA;
  const [section, setSection] = useState("home");
  const [query, setQuery] = useState("");
  const [tagState, setTagState] = useState<Record<string, "include" | "exclude">>({});
  const [mode, setMode] = useState<"include" | "exclude">("include");
  const [tagSearch, setTagSearch] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);
  const [page, setPage] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);

  // Zustand Store
  const { items: cartItems, addItem, removeItem, isInCart } = useCartStore();

  useEffect(() => {
    const activeTheme = THEME_CONFIG[section] || THEME_CONFIG.home;
    document.documentElement.style.setProperty("--pink-bg", activeTheme.bg);
    document.documentElement.style.setProperty("--bg-image", activeTheme.bgImage);
    document.documentElement.style.setProperty("--rose", activeTheme.rose);
    document.documentElement.style.setProperty("--rose-deep", activeTheme.roseDeep);
    document.documentElement.style.setProperty("--red", activeTheme.red);
  }, [section]);

  const categoryDefinedTags = useMemo(() => {
    if (section === "home") {
      return Object.values(TAGS_BY_CATEGORY).flat();
    }
    return TAGS_BY_CATEGORY[section] || [];
  }, [section]);

  const tagListWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    reviews
      .filter((r) => section === "home" || r.category === section)
      .forEach((r) => r.tags.forEach((t) => (counts[t.toLowerCase()] = (counts[t.toLowerCase()] || 0) + 1)));

    return categoryDefinedTags.map((tagObj) => {
      const lowerName = tagObj.name.toLowerCase();
      return {
        ...tagObj,
        count: counts[lowerName] || 0
      };
    });
  }, [reviews, section, categoryDefinedTags]);

  const included = Object.keys(tagState).filter((t) => tagState[t] === "include");
  const excluded = Object.keys(tagState).filter((t) => tagState[t] === "exclude");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reviews.filter(
      (r) =>
        (section === "home" || r.category === section) &&
        (!q || r.title.toLowerCase().includes(q)) &&
        included.every((t) => r.tags.map((x) => x.toLowerCase()).includes(t.toLowerCase())) &&
        !excluded.some((t) => r.tags.map((x) => x.toLowerCase()).includes(t.toLowerCase()))
    );
  }, [reviews, section, query, tagState]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  useEffect(() => setPage(1), [section, query, tagState]);

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen]);

  const applyTag = (tag: string) =>
    setTagState((s) => {
      const next = { ...s };
      if (s[tag] === mode) delete next[tag];
      else next[tag] = mode;
      return next;
    });

  const clearTag = (tag: string) =>
    setTagState((s) => {
      const next = { ...s };
      delete next[tag];
      return next;
    });

  const includeFromReview = (tag: string) => setTagState((s) => ({ ...s, [tag]: "include" }));

  const toggleCart = (item: MediaItem) => {
    if (isInCart(item.id)) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  const visibleTags = useMemo(() => {
    const q = tagSearch.trim().toLowerCase();
    const list = q
      ? tagListWithCounts.filter((item) => item.name.toLowerCase().includes(q))
      : tagListWithCounts;
    return q || showAllTags ? list : list.slice(0, VISIBLE_TAGS);
  }, [tagListWithCounts, tagSearch, showAllTags]);

  return (
    <div className="app">
      {/* ---------- NAVBAR ---------- */}
      <header className="nav">
        <span />
        <nav className="nav__links" aria-label="Sections">
          {SECTIONS.map((s) => (
            <button
              key={s}
              className={`nav__link ${section === s ? "is-active" : ""}`}
              aria-current={section === s ? "page" : undefined}
              onClick={() => setSection(s)}
            >
              {s}
            </button>
          ))}
        </nav>
        <button className="nav__card" onClick={() => setCartOpen(true)}>
          card
          <span className="nav__count" aria-label={`${cartItems.length} items`}>{cartItems.length}</span>
        </button>
      </header>

      {/* ---------- HOME OU CATEGORIA ---------- */}
      {section === "home" ? (
        <main className="panel" style={{ gridTemplateColumns: "1fr", textAlign: "center" }}>
          <div className="box" style={{ padding: "64px 24px", fontSize: "1.5rem", fontWeight: "600" }}>
            por fazer
          </div>
        </main>
      ) : (
        <main className="panel">
          <section className="results" aria-label="Reviews">
            <div className="results__bar">
              <input
                className="box field"
                type="search"
                placeholder="search by name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <p className="results__count">
                {filtered.length} {filtered.length === 1 ? "review" : "reviews"}
              </p>
            </div>

            {pageItems.length === 0 ? (
              <div className="empty">
                <p>Nothing matches these filters.</p>
                <button
                  className="box btn"
                  onClick={() => {
                    setTagState({});
                    setQuery("");
                  }}
                >
                  clear filters
                </button>
              </div>
            ) : (
              <ul className="list">
                {pageItems.map((r) => {
                  const inCart = isInCart(r.id);
                  const mediaUrl = `/${r.category}/${r.id}`;

                  return (
                    <li key={r.id} className="review">
                      <div className="review__side">
                        <Link href={mediaUrl} className="review__link">
                          <Cover src={r.coverImage} name={r.title} />
                        </Link>

                        <div className="box review__rating">
                          <Stars value={r.rating} />
                        </div>

                        <button
                          className={`box btn ${inCart ? "btn--added" : ""}`}
                          onClick={() => toggleCart(r)}
                          aria-pressed={inCart}
                        >
                          {inCart ? "in card" : "add to card"}
                        </button>
                      </div>

                      <div className="review__body">
                        <Link href={mediaUrl} className="review__link">
                          <h2 className="box review__name">{r.title}</h2>
                        </Link>

                        <ul className="box review__tags">
                          {r.tags.map((t) => (
                            <li key={t}>
                              <button
                                className={`chip chip--${tagState[t] || "plain"}`}
                                onClick={() => includeFromReview(t)}
                                title={`Only show ${t}`}
                              >
                                {t}
                              </button>
                            </li>
                          ))}
                        </ul>

                        <Link href={mediaUrl} className="review__link">
                          <div
                            className="box review__text"
                            dangerouslySetInnerHTML={{ __html: r.review || r.summary }}
                          />
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <Pagination page={current} totalPages={totalPages} onChange={goToPage} />
          </section>

          {/* ---------- PAINEL DE TAGS COM DESCRIÇÕES ---------- */}
          <aside className="box filters" aria-label="Tag filters">
            <div className="zone">
              <button
                className={`mode mode--include ${mode === "include" ? "is-on" : ""}`}
                aria-pressed={mode === "include"}
                onClick={() => setMode("include")}
              >
                tag to include
              </button>
              <div className="pills">
                {included.map((t) => (
                  <button key={t} className="chip chip--include chip--x" onClick={() => clearTag(t)}>
                    {t} <span aria-hidden="true">×</span>
                    <span className="sr-only">remove</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="zone">
              <button
                className={`mode mode--exclude ${mode === "exclude" ? "is-on" : ""}`}
                aria-pressed={mode === "exclude"}
                onClick={() => setMode("exclude")}
              >
                tag to exclude
              </button>
              <div className="pills">
                {excluded.map((t) => (
                  <button key={t} className="chip chip--exclude chip--x" onClick={() => clearTag(t)}>
                    {t} <span aria-hidden="true">×</span>
                    <span className="sr-only">remove</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pick">
              <p className="pick__hint">
                Pick the tags to <b>{mode}</b>:
              </p>
              <input
                className="field field--small"
                type="search"
                placeholder="find a tag"
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
              />
              <div className="pills pills--cloud">
                {visibleTags.map((tagObj) => (
                  <button
                    key={tagObj.name}
                    className={`chip chip--${tagState[tagObj.name] || "plain"}`}
                    onClick={() => applyTag(tagObj.name)}
                    title={tagObj.description}
                  >
                    {tagObj.name}
                    <span className="chip__count">{tagObj.count}</span>
                  </button>
                ))}
                {visibleTags.length === 0 && <p className="pick__hint">No tag called that.</p>}
              </div>
              <div className="pick__links">
                {!tagSearch && tagListWithCounts.length > VISIBLE_TAGS && (
                  <button className="link" onClick={() => setShowAllTags((v) => !v)}>
                    {showAllTags ? "show fewer" : `show all ${tagListWithCounts.length}`}
                  </button>
                )}
                {(included.length > 0 || excluded.length > 0) && (
                  <button className="link" onClick={() => setTagState({})}>clear all</button>
                )}
              </div>
            </div>
          </aside>
        </main>
      )}

      {/* ---------- DRAWER DO CART ---------- */}
      {cartOpen && <div className="scrim" onClick={() => setCartOpen(false)} />}
      <aside className={`drawer ${cartOpen ? "is-open" : ""}`} aria-hidden={!cartOpen} aria-label="Your card">
        <div className="drawer__head">
          <h2>card</h2>
          <button className="box btn btn--auto" onClick={() => setCartOpen(false)}>close</button>
        </div>
        
        {cartItems.length === 0 ? (
          <p className="pick__hint">Nothing here yet. Use “add to card” on any review.</p>
        ) : (
          <>
            <ul className="drawer__list">
              {cartItems.map((r) => {
                const mediaUrl = `/${r.category}/${r.id}`;

                return (
                  <li key={r.id} className="box drawer__item">
                    {/* LINK NA CAPA NO DRAWER */}
                    <Link href={mediaUrl} onClick={() => setCartOpen(false)}>
                      <Cover src={r.coverImage} name={r.title} />
                    </Link>

                    {/* LINK NO TÍTULO NO DRAWER */}
                    <div>
                      <Link 
                        href={mediaUrl} 
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        onClick={() => setCartOpen(false)}
                      >
                        <strong className="hover:underline">{r.title}</strong>
                      </Link>
                      <Stars value={r.rating} />
                    </div>

                    <button className="link" onClick={() => removeItem(r.id)}>remove</button>
                  </li>
                );
              })}
            </ul>

            {/* BOTÃO PARA ABRIR A PÁGINA COMPLETA DO CARRINHO E GERAR PDF */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '2px solid #ececec' }}>
              <Link 
                href="/cart" 
                className="box btn" 
                style={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  backgroundColor: '#2f5bf5', 
                  color: '#ffffff', 
                  fontWeight: '600',
                  padding: '12px 16px',
                  textDecoration: 'none'
                }}
                onClick={() => setCartOpen(false)}
              >
                Ver lista completa & Gerar PDF
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}