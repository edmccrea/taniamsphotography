export interface SiteData {
  startPageCollection: StartPageCollection;
  about: About;
  galleryCollection: GalleryCollection;
  allGalleryCollections: { title: string; url: string }[];
}

export interface StartPageCollection {
  startPageGallery: {
    images: Image[];
  };
}

export interface About {
  aboutText: string;
  pageTitle: string;
  profileImage: Image;
}

export interface GalleryCollection {
  title: string;
  images: Image[];
  url: string;
  displayType: string;
}

export interface Gallery {
  title: string;
  displayType: string;
  images: Image[];
}

export interface Image {
  blurThumb: string;
  responsiveImage: {
    src: string;
  };
}

export interface BlogPost {
  title: string;
  category: string;
  excerpt: string;
  publishDate: string;
  id: string;
  url: string;
  cardImage: {
    responsiveImage: {
      src: string;
    };
  };
  content: BlogContent[];
}

export interface BlogContent {
  image?: {
    responsiveImage: {
      src: string;
    };
  };
  caption?: string;
  id?: string;
  subtitle?: string;
  text?: string;
}
