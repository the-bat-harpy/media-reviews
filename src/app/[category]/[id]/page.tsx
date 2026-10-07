// src/app/[category]/[id]/page.tsx
'use client';

import { use } from 'react';
import Link from 'next/link';
import { MEDIA_DATA, MediaItem } from '@/data/mediaData';
import { useCartStore } from '@/store/useCartStore';
import '../../media-detail.css';

const NAV = [
  { key: 'home', label: 'home', href: '/' },
  { key: 'manhwa', label: 'manhwas', href: '/#manhwa' },
  { key: 'books', label: 'books', href: '/#books' },
  { key: 'series', label: 'series', href: '/#series' },
  { key: 'movie', label: 'movies', href: '/#movie' },
];

const BACKGROUNDS: Record<string, string> = {
  manhwa: "url('/images/bg-manhwa.png')",
  books: "url('/images/bg-books.png')",
  series: "url('/images/bg-series.png')",
  movie: "url('/images/bg-movie.png')",
};

function CartPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 3.5h2.6l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.1l1.6-6.1H6.1" />
      <circle cx="9.5" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
      <path d="M13 8.2v4.4M10.8 10.4h4.4" />
    </svg>
  );
}

export default function MediaDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const { category, id } = use(params);
  const { addItem, removeItem, isInCart } = useCartStore();

  // Procura a obra ativa no teu JSON
  const item = MEDIA_DATA.find((m) => m.id === id) || MEDIA_DATA[0];
  const inCart = isInCart(item.id);

  // Procura obras similares com base no array similarRecs
  const similarItems = (item.similarRecs || [])
    .map((recId) => MEDIA_DATA.find((m) => m.id === recId))
    .filter(Boolean) as MediaItem[];

  const bgImage = BACKGROUNDS[category] || BACKGROUNDS.manhwa;

  const handleCartToggle = () => {
    if (inCart) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  return (
    <div className="detail-stage" style={{ backgroundImage: bgImage }}>
      {/* NAVBAR */}
      <nav className="detail-nav" aria-label="Principal">
        <ul>
          {NAV.map((navItem) => (
            <li key={navItem.key}>
              <Link href={navItem.href} aria-current={category === navItem.key ? 'page' : undefined}>
                {navItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* PAINEL PRINCIPAL */}
      <main className="detail-panel">
        {/* Coluna Esquerda */}
        <aside className="detail-side">
          <div className="detail-box detail-side__cover">
            {item.coverImage && <img src={item.coverImage} alt={item.title} />}
          </div>
          <div className="detail-box detail-side__status">{item.status || 'Status N/A'}</div>
          <ul className="detail-box detail-side__tags">
            {item.tags?.map((t) => (
              <li key={t} className="detail-side__chip">#{t}</li>
            ))}
          </ul>
          <div className="detail-box detail-side__year">{item.year || 'Ano N/A'}</div>
        </aside>

        {/* Centro */}
        <section className="detail-main">
          <header className="detail-main__head">
            <h1 className="detail-box detail-main__title">{item.title}</h1>
            <div className="detail-box detail-main__rating">★ {item.rating}</div>
          </header>

          <div className="detail-box detail-main__creator">
            {item.creator ? `Por ${item.creator}` : 'Criador N/A'}
          </div>

          <div
            className="detail-box detail-main__review"
            dangerouslySetInnerHTML={{ __html: item.review || item.summary }}
          />

          {/* Secção de Recomendações */}
          <div className="detail-box detail-recs">
            <div className="detail-recs__title">Recomendações Semelhantes</div>
            <ul className="detail-recs__list">
              {similarItems.length > 0 ? (
                similarItems.map((rec) => (
                  <li key={rec.id}>
                    <Link href={`/${rec.category}/${rec.id}`} className="detail-rec">
                      <div className="detail-rec__cover">
                        <img src={rec.coverImage} alt={rec.title} />
                      </div>
                      <span className="detail-rec__name">{rec.title}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="detail-rec">
                  <span className="detail-rec__name" style={{ color: '#888' }}>
                    Sem recomendações adicionadas
                  </span>
                </li>
              )}
            </ul>
          </div>
        </section>

        {/* Botão Adicionar ao Cart */}
        <button
          type="button"
          className={`detail-add ${inCart ? 'detail-add--added' : ''}`}
          onClick={handleCartToggle}
          aria-label="Adicionar ao card"
        >
          <CartPlusIcon />
          <span>{inCart ? 'No Card' : 'Adicionar'}</span>
        </button>
      </main>
    </div>
  );
}