// src/data/mediaData.ts

import manhwa from './items/manhwas.json';
import books from './items/books.json';
import series from './items/series.json';
import movie from './items/movies.json';

export type Category = 'manhwa' | 'books' | 'series' | 'movie';

export interface MediaItem {
  id: string;
  title: string;
  category: 'manhwa' | 'books' | 'series' | 'movie';
  coverImage: string;
  creator: string;       // Author / Director / Studio
  year: number;          // Release Year
  rating: number;        // e.g. 9.5
  status: 'Completed' | 'Ongoing' | 'Hiatus' | 'Dropped';
  tags: string[];
  summary: string;
  review: string;        // HTML review string
  similarRecs?: string[]; // Array of media IDs to show in "similar recs" section
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

import tagsData from './tags.json';

export interface TagInfo {
  name: string;
  description: string;
}

export type CategoryTags = Record<string, TagInfo[]>;

export const TAGS_BY_CATEGORY: CategoryTags = tagsData;