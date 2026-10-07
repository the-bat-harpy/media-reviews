// src/components/PDFDownloadButton.tsx
'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import PDFDocument from '@/components/PDFDocument';
import { MediaItem } from '@/data/mediaData';

export default function PDFDownloadButton({ items }: { items: MediaItem[] }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      // Gera o Blob com a versão atualizada do PDFDocument
      const blob = await pdf(<PDFDocument items={items} />).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'to-be-consumed.pdf';
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      type="button" 
      onClick={handleDownload} 
      disabled={loading}
      className="tbc__pdf-btn"
    >
      {loading ? 'A gerar PDF...' : 'Descarregar PDF'}
    </button>
  );
}