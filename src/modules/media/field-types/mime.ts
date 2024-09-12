const ImgMIME = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;
export const imageMIMEs = [...ImgMIME];
export type ImageMIME = (typeof ImgMIME)[number];

export type MIME = ImageMIME;
