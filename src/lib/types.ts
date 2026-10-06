export interface ResponsiveImage {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  alt: string | null;
  base64: string | null;
}

export interface Image {
  responsiveImage: ResponsiveImage;
}

export interface About {
  aboutText: string;
  pageTitle: string;
  profileImage: Image;
}

export interface GalleryCard {
  title: string;
  url: string;
  cover: Image | null;
  count: number;
}

export interface Gallery {
  title: string;
  displayType: 'horizontal' | 'vertical' | 'showcase' | string;
  images: Image[];
}

export interface BlogCard {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  publishDate: string;
  url: string;
  cardImage: Image;
}

export type BlogBlock =
  | { __typename: 'TextBlockRecord'; id: string; text: string }
  | { __typename: 'SubtitleBlockRecord'; id: string; subtitle: string }
  | { __typename: 'ImageBlockRecord'; id: string; image: Image; caption: string | null };

export interface BlogPost extends BlogCard {
  content: BlogBlock[];
}
