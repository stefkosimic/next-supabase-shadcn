export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "next-supa-shadcn",
  description: "",
  footer: [
    { name: "Home", href: "/" },
    { name: "About", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Shipping & Return Policy", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};

export const defaultUrl = process.env.NEXT_PUBLIC_URL;

export const MOLLIE_TEST_MODE = false;
