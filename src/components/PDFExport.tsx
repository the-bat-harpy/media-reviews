// src/components/PDFDocument.tsx
import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { MediaItem } from '@/data/mediaData';

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#d9d9d9', fontFamily: 'Helvetica' },
  heading: { fontSize: 20, fontWeight: 'bold', color: '#2f5bf5', backgroundColor: '#FFFFFF', padding: '8 20', marginBottom: 24, borderRadius: 4, width: '60%' },
  list: { display: 'flex', flexDirection: 'column', gap: 16 },
  row: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 },
  num: { width: 36, height: 36, backgroundColor: '#FFFFFF', borderRadius: 4, textAlign: 'center', paddingTop: 10, fontSize: 12, fontWeight: 'bold' },
  cover: { width: 70, height: 90, backgroundColor: '#FFFFFF', borderRadius: 4, objectFit: 'cover' },
  coverPlaceholder: { width: 70, height: 90, backgroundColor: '#FFFFFF', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  textContainer: { display: 'flex', flexDirection: 'column', gap: 8, flex: 1 },
  title: { fontSize: 13, fontWeight: 'bold', backgroundColor: '#FFFFFF', padding: '8 14', borderRadius: 4 },
  category: { fontSize: 10, color: '#555555', backgroundColor: '#FFFFFF', padding: '6 14', borderRadius: 4, width: '40%', textTransform: 'capitalize' },
});

export function PDFDocument({ items }: { items: MediaItem[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>To be consumed</Text>
        <View style={styles.list}>
          {items.map((item, index) => (
            <View key={item.id || index} style={styles.row}>
              <Text style={styles.num}>{index + 1}</Text>
              
              {item.coverImage ? (
                <Image src={item.coverImage} style={styles.cover} />
              ) : (
                <View style={styles.coverPlaceholder} />
              )}

              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>{item.category}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}