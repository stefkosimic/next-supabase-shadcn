import { ADMIN_ROUTES, ADMIN_SIDEBAR_LINK_LABELS } from "@/content/admin";

import { signOut } from "@/lib/actions/profile";

import { Icons } from "./icons";

export const navLinks = [
  {
    label: ADMIN_SIDEBAR_LINK_LABELS.customers,
    icon: Icons.customers,
    href: `/${ADMIN_ROUTES.CUSTOMERS.all}`,
  },
  {
    label: ADMIN_SIDEBAR_LINK_LABELS.orders,
    icon: Icons.orders,
    href: `/${ADMIN_ROUTES.ORDERS.all}`,
  },
  {
    label: ADMIN_SIDEBAR_LINK_LABELS.products,
    icon: Icons.products,
    href: `/${ADMIN_ROUTES.PRODUCTS.all}`,
  },
  {
    label: ADMIN_SIDEBAR_LINK_LABELS.categories,
    icon: Icons.categories,
    href: `/${ADMIN_ROUTES.CATEGORIES.all}`,
  },
  {
    label: ADMIN_SIDEBAR_LINK_LABELS.brands,
    icon: Icons.brands,
    href: `/${ADMIN_ROUTES.BRANDS.all}`,
  },
  {
    label: ADMIN_SIDEBAR_LINK_LABELS.fees,
    icon: Icons.fees,
    href: `/${ADMIN_ROUTES.FEES.all}`,
  },
  {
    label: ADMIN_SIDEBAR_LINK_LABELS.attributes,
    icon: Icons.attributes,
    href: `/${ADMIN_ROUTES.ATTRIBUTES.all}`,
  },
  {
    label: ADMIN_SIDEBAR_LINK_LABELS.logout,
    icon: Icons.logout,
    // href: `/${ADMIN_ROUTES.logout}`,
    action: () => signOut(),
  },
];
