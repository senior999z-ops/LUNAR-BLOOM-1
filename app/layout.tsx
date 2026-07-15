import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, Pinyon_Script } from 'next/font/google';
import { Providers } from '@/components/providers';
import { CartDrawer } from '@/components/cart-drawer';
import { CustomCursor } from '@/components/custom-cursor';
import { PageTransition } from '@/components/page-transition';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-cormorant', display: 'swap' });
const script = Pinyon_Script({ subsets: ['latin'], weight: ['400'], variable: '--font-script', display: 'swap' });
export const metadata: Metadata = {
  title: 'LUNAR BLOOM — Luxury Pakistani Women Couture by Zaighum Mujahid',
  description: 'Handcrafted shalwar kameez, formal & bridal wear. Made in Lahore, Pakistan. By Zaighum Mujahid.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} ${script.variable} font-sans antialiased h-screen overflow-hidden`}>
        <Providers>
          <CustomCursor />
          <PageTransition>
            {children}
          </PageTransition>
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}