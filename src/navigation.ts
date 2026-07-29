import {createNavigation} from 'next-intl/navigation';
import {locales} from './i18n/request';

export const pathnames = {
  '/': '/',
  '/about-us': {
    en: '/about-us',
    es: '/nosotros'
  },
  '/contact': {
    en: '/contact',
    es: '/contacto'
  },
  '/services': {
    en: '/services',
    es: '/servicios'
  },
  '/services/[slug]': {
    en: '/services/[slug]',
    es: '/servicios/[slug]'
  },
  '/track': {
    en: '/track',
    es: '/rastreo'
  },
  '/track/[uuid]': {
    en: '/track/[uuid]',
    es: '/rastreo/[uuid]'
  }
} as const;

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation({
    locales,
    pathnames
  });
