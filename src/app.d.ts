declare global {
  namespace App {
    interface SiteData {
      startPageCollection: StartPageCollection;
      about: About;
      galleryCollection: GalleryCollection;
      allGalleryCollections: { title: string; url: string }[];
    }

    interface StartPageCollection {
      startPageGallery: {
        images: Image[];
      }[];
    }

    interface About {
      aboutText: string;
      pageTitle: string;
      profileImage: Image;
    }

    interface GalleryCollection {
      title: string;
      images: Image[];
      url: string;
      displayType: string;
    }

    interface Gallery {
      title: string;
      displayType: string;
      images: Image[];
    }

    interface Image {
      blurThumb: string;
      responsiveImage: {
        src: string;
        width: number;
        height: number;
        aspectRatio: number;
        alt: string | null;
        base64: string;
        sizes: string;
        srcSet: string;
        webpSrcSet: string;
        title: string | null;
      };
    }

    interface BlogPost {
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

    interface BlogContent {
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
  }
}

export {};
