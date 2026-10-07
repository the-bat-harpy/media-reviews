// src/data/mediaData.ts

import manhwa from './items/manhwa.json';
import books from './items/books.json';
import series from './items/series.json';
import movie from './items/movie.json';

export type Category = 'manhwa' | 'books' | 'series' | 'movie';

export interface MediaItem {
  id: string;
  title: string;
  category: Category;
  coverImage: string;
  rating: number;
  tags: string[];
  summary: string;
  review: string; // HTML-formatted review string
  status: 'Completed' | 'Ongoing' | 'Dropped';
}

export const MEDIA_DATA: MediaItem[] = [
  ...(manhwa as MediaItem[]),
  ...(books as MediaItem[]),
  ...(series as MediaItem[]),
  ...(movie as MediaItem[])
];

export const CATEGORIES: { key: Category; label: string; themeColor: string }[] = [
  { key: 'manhwa', label: 'Manhwa', themeColor: '#84174b' },
  { key: 'books', label: 'Books', themeColor: '#a855f7' },
  { key: 'series', label: 'TV Series', themeColor: '#3282b8' },
  { key: 'movie', label: 'Movies', themeColor: '#db1212d8' }
];