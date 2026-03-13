import type {Metadata} from 'next';
import { Cairo, Tajawal, Changa } from 'next/font/google';
import './globals.css'; // Global styles

const cairo = Cairo({ subsets: ['arabic'], variable: '--font-sans' });
const tajawal = Tajawal({ weight: ['400', '500', '700'], subsets: ['arabic'], variable: '--font-serif' });
const changa = Changa({ weight: ['400', '700'], subsets: ['arabic'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'هيلث كير | ملفات تعريف الأطباء',
  description: 'ملفات تعريف احترافية لأطباء الأسنان.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable} ${changa.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
