import type { ResponsiveImage } from '#lib/types.js';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return Number.isNaN(date.getTime()) ? isoDate : dateFormatter.format(date);
}

const PRINT_RATIOS: [label: string, value: number][] = [
  ['1:1', 1],
  ['5:4', 1.25],
  ['4:3', 4 / 3],
  ['5:7', 1.4],
  ['3:2', 1.5],
];

export function nearestPrintRatio(width: number, height: number): string {
  const ratio = Math.max(width, height) / Math.min(width, height);
  let best = PRINT_RATIOS[0];
  for (const option of PRINT_RATIOS) {
    if (Math.abs(option[1] - ratio) < Math.abs(best[1] - ratio)) best = option;
  }
  return height > width ? `${best[0]} portrait` : best[0];
}

export function printEnquiryUrl(
  context: string,
  index: number,
  total: number,
  image: ResponsiveImage,
): string {
  const params = new URLSearchParams({
    print: `${context || 'Gallery'}, image ${index + 1} of ${total}`,
    image: image.src.split('?')[0],
    ratio: nearestPrintRatio(image.width, image.height),
  });
  return `/contact?${params}`;
}

export function distinctExcerpt(excerpt: string | null | undefined, title: string): string | null {
  if (!excerpt) return null;
  const norm = (value: string) => value.replace(/\s+/g, ' ').trim().toLowerCase();
  return norm(excerpt) === norm(title) ? null : excerpt.replace(/\s+/g, ' ').trim();
}
