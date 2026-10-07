// src/app/cart/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import dynamic from 'next/dynamic';
import './cart.css';

// Importação dinâmica do botão apenas no cliente
const PDFDownloadButton = dynamic(
  () => import('@/components/PDFDownloadButton'),
  { ssr: false }
);

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 6h17" />
      <path d="M9 6V4.2c0-.7.5-1.2 1.2-1.2h3.6c.7 0 1.2.5 1.2 1.2V6" />
      <path d="M5.8 6l1 13.2c.1 1 .9 1.8 1.9 1.8h6.6c1 0 1.8-.8 1.9-1.8L18.2 6" />
      <path d="M10 10.5v6M14 10.5v6" />
    </svg>
  );
}

export default function CartPage() {
  const { items, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="tbc">
      <div className="tbc__header">
        <h1 className="tbc__heading">To be consumed</h1>
        
        {items.length > 0 && (
          <PDFDownloadButton items={items} />
        )}
      </div>

      {items.length === 0 ? (
        <div className="tbc__empty">
          Nenhuma obra adicionada ainda. Explora o site e adiciona itens à tua lista!
        </div>
      ) : (
        <ol className="tbc__list">
          {items.map((it, i) => {
            const mediaUrl = `/${it.category}/${it.id}`;

            return (
              <li className="row" key={it.id ?? i}>
                <span className="row__num">{i + 1}</span>

                {/* LINK NA CAPA */}
                <Link href={mediaUrl} className="row__link">
                  <div className="row__cover">
                    {it.coverImage ? (
                      <img src={it.coverImage} alt={it.title} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#fff' }} />
                    )}
                  </div>
                </Link>

                {/* LINK NO TÍTULO E CATEGORIA */}
                <div className="row__text">
                  <Link href={mediaUrl} className="row__link">
                    <h2 className="row__title">{it.title}</h2>
                  </Link>
                  <p className="row__category">{it.category}</p>
                </div>

                {/* BOTÃO REMOVER */}
                <button
                  type="button"
                  className="row__remove"
                  onClick={() => removeItem(it.id)}
                  aria-label={`Retirar ${it.title}`}
                >
                  <TrashIcon />
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </main>
  );
}