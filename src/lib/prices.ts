export interface PrintSize {
  sizeIn: string;
  sizeCm: string;
  price: number;
}

export interface PrintRatio {
  key: string;
  label: string;
  ratio: [number, number];
  printOnly: PrintSize[];
  framed: PrintSize[];
}

export const printRatios: PrintRatio[] = [
  {
    key: '4:3',
    label: '4:3',
    ratio: [4, 3],
    printOnly: [
      { sizeIn: '6x4.5', sizeCm: '15.2 x 11.4', price: 9.99 },
      { sizeIn: '8x6', sizeCm: '20.3 x 15.2', price: 19.99 },
      { sizeIn: '12x9', sizeCm: '30.5 x 22.9', price: 21.99 },
      { sizeIn: '16x12', sizeCm: '40.6 x 30.5', price: 29.99 },
      { sizeIn: '20x15', sizeCm: '50.8 x 38.1', price: 34.99 },
      { sizeIn: '24x18', sizeCm: '61 x 45.7', price: 59.99 },
    ],
    framed: [
      { sizeIn: '16x12', sizeCm: '40.6 x 30.5', price: 99.99 },
      { sizeIn: '24x18', sizeCm: '61 x 45.7', price: 159.99 },
    ],
  },
  {
    key: '3:2',
    label: '3:2',
    ratio: [3, 2],
    printOnly: [
      { sizeIn: '6x4', sizeCm: '15.2 x 10.2', price: 9.99 },
      { sizeIn: '7.5x5', sizeCm: '19.1 x 12.7', price: 11.99 },
      { sizeIn: '9x6', sizeCm: '22.9 x 15.2', price: 19.99 },
      { sizeIn: '12x8', sizeCm: '30.5 x 20.3', price: 21.99 },
      { sizeIn: '15x10', sizeCm: '38.1 x 25.4', price: 29.99 },
      { sizeIn: '18x12', sizeCm: '45.7 x 30.5', price: 34.99 },
      { sizeIn: '24x16', sizeCm: '61 x 40.6', price: 59.99 },
    ],
    framed: [
      { sizeIn: '15x10', sizeCm: '38.1 x 25.4', price: 99.99 },
      { sizeIn: '24x16', sizeCm: '61 x 40.6', price: 159.99 },
    ],
  },
  {
    key: '5:4',
    label: '5:4',
    ratio: [5, 4],
    printOnly: [
      { sizeIn: '5x4', sizeCm: '12.7 x 10.2', price: 4.99 },
      { sizeIn: '10x8', sizeCm: '25.4 x 20.3', price: 24.99 },
      { sizeIn: '15x12', sizeCm: '38.1 x 30.5', price: 29.99 },
      { sizeIn: '20x16', sizeCm: '50.8 x 40.6', price: 54.99 },
    ],
    framed: [
      { sizeIn: '15x12', sizeCm: '38.1 x 30.5', price: 99.99 },
      { sizeIn: '20x16', sizeCm: '50.8 x 40.6', price: 154.99 },
    ],
  },
  {
    key: '5:7',
    label: '5:7',
    ratio: [7, 5],
    printOnly: [
      { sizeIn: '7x5', sizeCm: '17.8 x 12.7', price: 11.99 },
      { sizeIn: '10.5x7.5', sizeCm: '26.7 x 19.1', price: 19.99 },
      { sizeIn: '14x10', sizeCm: '35.6 x 25.4', price: 21.99 },
      { sizeIn: '17.5x12.5', sizeCm: '44.5 x 31.8', price: 29.99 },
      { sizeIn: '21x15', sizeCm: '53.3 x 38.1', price: 34.99 },
    ],
    framed: [
      { sizeIn: '17.5x12.5', sizeCm: '44.5 x 31.8', price: 99.99 },
      { sizeIn: '28x20', sizeCm: '71.1 x 50.8', price: 159.99 },
    ],
  },
  {
    key: '1:1',
    label: '1:1',
    ratio: [1, 1],
    printOnly: [
      { sizeIn: '6x6', sizeCm: '15.2 x 15.2', price: 13.99 },
      { sizeIn: '8x8', sizeCm: '20.3 x 20.3', price: 22.99 },
      { sizeIn: '10x10', sizeCm: '25.4 x 25.4', price: 25.99 },
      { sizeIn: '12x12', sizeCm: '30.5 x 30.5', price: 27.99 },
      { sizeIn: '16x16', sizeCm: '40.6 x 40.6', price: 39.99 },
      { sizeIn: '20x20', sizeCm: '50.8 x 50.8', price: 54.99 },
      { sizeIn: '24x24', sizeCm: '61 x 61', price: 74.99 },
    ],
    framed: [
      { sizeIn: '16x16', sizeCm: '40.6 x 40.6', price: 109.99 },
      { sizeIn: '24x24', sizeCm: '61 x 61', price: 169.99 },
    ],
  },
];

export interface PriceRow {
  sizeIn: string;
  sizeCm: string;
  print: number | null;
  framed: number | null;
}

export function priceRows(ratio: PrintRatio): PriceRow[] {
  const rows = new Map<string, PriceRow>();
  for (const size of ratio.printOnly) {
    rows.set(size.sizeIn, {
      sizeIn: size.sizeIn,
      sizeCm: size.sizeCm,
      print: size.price,
      framed: null,
    });
  }
  for (const size of ratio.framed) {
    const row = rows.get(size.sizeIn);
    if (row) row.framed = size.price;
    else
      rows.set(size.sizeIn, {
        sizeIn: size.sizeIn,
        sizeCm: size.sizeCm,
        print: null,
        framed: size.price,
      });
  }
  return [...rows.values()];
}

export const lowestPrice = Math.min(...printRatios.flatMap(r => r.printOnly.map(s => s.price)));

export const gbp = (value: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);

export const SHOP_HERO_IMAGE = '/images/shop/example_14.jpeg';
