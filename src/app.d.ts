// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}

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
  }
}

export {};
