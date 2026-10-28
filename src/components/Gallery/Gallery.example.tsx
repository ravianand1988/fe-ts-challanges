import { Gallery, type TGallery } from "./Gallery";

const IMAGES = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb",
];

const GALLERY_ITEMS: TGallery[] = [
  { id: 1, src: "gallery/image-1.avif" },
  { id: 2, src: "gallery/image-2.avif" },
  { id: 3, src: "gallery/image-3.avif" },
  { id: 4, src: "gallery/image-4.avif" },
  { id: 5, src: "gallery/image-5.webp" },
  { id: 6, src: "gallery/image-6.jpeg" },
  { id: 7, src: "gallery/image-7.webp" },
  ...IMAGES.map((src, index) => ({ id: index + 8, src: src })),
];

const GalleryExample = () => {
  return <Gallery items={GALLERY_ITEMS} />;
};

export { GalleryExample };
