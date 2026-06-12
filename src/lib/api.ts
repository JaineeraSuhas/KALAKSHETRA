import { products } from "@/data/products";
import { artisans } from "@/data/artisans";
import { Product, Artisan } from "@/types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const api = {
  async getProducts(): Promise<Product[]> {
    await delay(500);
    return products;
  },
  async getProductById(id: string): Promise<Product | undefined> {
    await delay(350);
    return products.find((p) => p.id === id);
  },
  async getSimilarProducts(product: Product): Promise<Product[]> {
    await delay(300);
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  },
  async getArtisans(): Promise<Artisan[]> {
    await delay(400);
    return artisans;
  },
  async getArtisanById(id: string): Promise<Artisan | undefined> {
    await delay(350);
    return artisans.find((a) => a.id === id);
  },
  async getArtisanProducts(artisanId: string): Promise<Product[]> {
    await delay(350);
    return products.filter((p) => p.artisanId === artisanId);
  },
  async searchProducts(query: string): Promise<Product[]> {
    await delay(300);
    const q = query.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.artisanName.toLowerCase().includes(q)
    );
  },
  async login(email: string, _password: string): Promise<{ name: string; email: string }> {
    await delay(700);
    return { name: email.split("@")[0], email };
  },
  async signup(name: string, email: string, _password: string): Promise<{ name: string; email: string }> {
    await delay(700);
    return { name, email };
  },
};
