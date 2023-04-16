declare global {
  namespace App {
    interface SiteData {
      startPageCollection: StartPageCollection;
      about: About;
      galleryCollection: GalleryCollection;
    }

    interface StartPageCollection {
      startPageGallery: {
        images: Image[];
      };
    }

    interface About {
      aboutText: string;
      pageTitle: string;
      profileImage: Image;
    }

    interface GalleryCollection {
      title: string;
      gallery: Gallery[];
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
