// Shared CMS Data Types
export interface HeroData {
  label?: string;
  title?: string;
  subtitle?: string;
  lottieAnimationUrl?: string;
}

export interface ScrollSectionItem {
  title: string;
  description: string;
  order?: number;
  lottieAnimationUrl?: string;
}

export interface ScrollSectionData {
  heading?: string;
  sections?: ScrollSectionItem[];
  policyAppsSvgUrl?: string;
}

export interface InteractiveCardSectionData {
  title?: string;
  description?: string;
  beforeCard?: {
    title?: string;
    description?: string;
    svgImageUrl?: string | null;
  };
  afterCard?: {
    title?: string;
    description?: string;
    svgImageUrl?: string | null;
  };
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
  order?: number;
}

export interface CTASectionData {
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  circleImage?: string | null;
}

export interface Card {
  title: string;
  description?: string;
  text?: string;
  image?: string;
  imageUrl?: string;
  order?: number;
}

export interface StickyHorizontalScrollData {
  label?: string;
  title?: string;
  cards?: Card[];
}

export interface StackedCardsSectionData {
  title?: string;
  description?: string;
  cards?: Card[];
}

export interface HeaderData {
  logo?: {
    text?: string;
    link?: string;
    image?: unknown;
  };
  navigation?: Array<{
    label: string;
    url?: string;
    hasDropdown?: boolean;
    subItems?: Array<{
      label: string;
      url?: string;
    }>;
  }>;
  ctaButton?: {
    text?: string;
    url?: string | null;
  };
  dropdownArrowUrl?: string | null;
}

export interface FooterData {
  logo?: {
    text?: string;
    tagline?: string;
  };
  email?: string;
  address?: string;
  socialLinks?: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
  sections?: Array<{
    title: string;
    links: Array<{
      label: string;
      url: string;
    }>;
  }>;
  legalLinks?: Array<{
    label: string;
    url: string;
    isButton?: boolean;
  }>;
  copyright?: string;
}

export interface CMSData {
  hero?: HeroData;
  scrollSection?: ScrollSectionData;
  interactiveCardSection?: InteractiveCardSectionData;
  features?: Feature[];
  ctaSection?: CTASectionData;
  header?: HeaderData | null;
  footer?: FooterData | null;
  stickyHorizontalScroll?: StickyHorizontalScrollData | null;
  verticalCardReveal?: unknown | null;
  stackedCardsSection?: StackedCardsSectionData | null;
}

