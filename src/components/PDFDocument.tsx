// src/components/PDFDocument.tsx
import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { MediaItem } from '@/data/mediaData';

const styles = StyleSheet.create({
  page: { 
    padding: 36, 
    backgroundColor: '#d9d9d9', 
    fontFamily: 'Helvetica' 
  },
  heading: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2f5bf5', 
    backgroundColor: '#FFFFFF', 
    padding: '8 20', 
    marginBottom: 24, 
    borderRadius: 4, 
    width: '50%' 
  },
  list: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 16 
  },
  row: { 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16 
  },
  num: { 
    width: 36, 
    height: 36, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 4, 
    textAlign: 'center', 
    paddingTop: 10, 
    fontSize: 12, 
    fontWeight: 'bold',
    color: '#1e1e1e'
  },
  cover: { 
    width: 70, 
    height: 90, 
    borderRadius: 4, 
    objectFit: 'cover' 
  },
  coverPlaceholder: { 
    width: 70, 
    height: 90, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 4, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  textContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: 8, 
    flex: 1 
  },
  title: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    backgroundColor: '#FFFFFF', 
    padding: '8 14', 
    borderRadius: 4,
    color: '#1e1e1e'
  },
  metaContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  category: { 
    fontSize: 10, 
    color: '#555555', 
    backgroundColor: '#FFFFFF', 
    padding: '6 12', 
    borderRadius: 4, 
    textTransform: 'capitalize' 
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    flex: 1
  },
  tagChip: {
    fontSize: 8,
    color: '#2f5bf5',
    backgroundColor: '#FFFFFF',
    padding: '4 8',
    borderRadius: 4
  }
});

export function PDFDocument({ items }: { items: MediaItem[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>To be consumed</Text>
        <View style={styles.list}>
          {items.map((item, index) => (
            <View key={item.id || index} style={styles.row}>
              {/* NÚMERO */}
              <Text style={styles.num}>{index + 1}</Text>
              
              {/* CAPA DA OBRA */}
              {item.coverImage ? (
                <Image src={item.coverImage} style={styles.cover} />
              ) : (
                <View style={styles.coverPlaceholder}>
                  <Text style={{ fontSize: 10, color: '#999' }}>Sem Capa</Text>
                </View>
              )}

              {/* TÍTULO, CATEGORIA E TAGS */}
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                
                <View style={styles.metaContainer}>
                  <Text style={styles.category}>{item.category}</Text>
                  
                  {/* TAGS EM VEZ DE REVIEW */}
                  {item.tags && item.tags.length > 0 && (
                    <View style={styles.tagsContainer}>
                      {item.tags.map((tag) => (
                        <Text key={tag} style={styles.tagChip}>
                          #{tag}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default PDFDocument;