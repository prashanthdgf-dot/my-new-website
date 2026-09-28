import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
}

export default function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  const { language } = useLanguage();

  const handleClick = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const allItems: BreadcrumbItem[] = [
    { name: language === 'en' ? 'Home' : 'ಮುಖಪುಟ', path: '/' },
    ...items
  ];

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 bg-black/60 border border-zinc-900 rounded-2xl mb-8 backdrop-blur-md inline-flex items-center flex-wrap gap-2 text-xs font-mono">
      <ol className="flex items-center flex-wrap gap-2 text-zinc-400">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {index === 0 && <Home className="w-3.5 h-3.5 text-[#FFC400]" />}
              {isLast ? (
                <span className="text-[#FFC400] font-bold" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.path}
                  onClick={(e) => handleClick(e, item.path)}
                  className="hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              )}
              {!isLast && <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
