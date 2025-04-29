import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Re-styled SidebarItem to match example
const SidebarItem = ({ icon, text, href }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <li> {/* Use li for semantics, Link wraps the anchor */}
      <Link href={href} legacyBehavior>
        <a 
          className={`flex items-center px-4 py-3.5 rounded-xl cursor-pointer transition duration-200 ease-in-out group relative text-sm
            ${isActive 
              ? 'bg-[var(--hover-bg)] text-[var(--primary-text)] font-medium shadow-sm' // Active state uses hover-bg, primary-text
              : 'text-[var(--sidebar-text)] hover:bg-[var(--hover-bg)] hover:text-[var(--primary-text)] hover:-translate-x-[-5px]' // Default uses sidebar-text, hover uses hover-bg
            }`}
        >
          {/* Icon uses sidebar-icon color, changes to accent on hover/active */}
          <span 
            className={`material-symbols-outlined mr-3 text-xl w-5 text-center text-[var(--sidebar-icon)] transition-colors duration-200 ease-in-out 
            ${isActive ? '!text-[var(--accent)]' : 'group-hover:text-[var(--accent)]'}`}
          >
            {icon}
          </span>
          <span>{text}</span>
        </a>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    // REMOVED fixed positioning, adjusted width back if needed or keep w-60?
    // Let's keep w-60 for now as requested previously, but remove fixed.
    <div className="h-screen w-60 bg-[var(--sidebar-bg)] p-6 flex flex-col border-r border-[var(--border-color)] shadow-lg">
      {/* Logo Section */}
      <div className="p-4 mb-8 text-xl font-semibold text-center border-b border-[var(--border-color)] text-[var(--primary-text)] relative">
        {/* Simplified Logo - Placeholder SVG added */}
        <svg className="w-auto h-8 mx-auto mb-2 fill-[var(--primary-text)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.68 95.62">
           {/* Placeholder SVG Content */}
           <g>
             <rect x="0" y="0" width="64.68" height="95.62" fill="#cccccc"/>
             <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#555555">LOGO</text>
           </g>
        </svg>
        <span>Axis App</span>
      </div>

      {/* Nav Links - Reverted to original text/icons/hrefs */}
      <nav className="flex-1 px-2">
        <ul className="flex flex-col space-y-2">
          {/* Original Links */} 
          <SidebarItem icon="dashboard" text="Dashboard" href="/dashboard" /> 
          <SidebarItem icon="group" text="Customers" href="/customers" /> 
          <SidebarItem icon="shopping_cart" text="Orders" href="/orders" /> 
          <SidebarItem icon="inventory_2" text="Products" href="/products" /> 
          <SidebarItem icon="assessment" text="Reports" href="/reports" /> 
          <SidebarItem icon="settings" text="Settings" href="/settings" />
        </ul>
      </nav>

      {/* Footer - Basic user profile implementation */}
      <div className="mt-auto border-t border-[var(--border-color)] pt-4">
        <div className="flex items-center cursor-pointer p-2 rounded-xl hover:bg-[var(--hover-bg)] transition-colors duration-200 group">
          {/* Placeholder Avatar */}
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] flex items-center justify-center text-sm font-medium mr-3">
            SJ
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-[var(--primary-text)]">Solomon John</div>
            <div className="text-xs text-[var(--sidebar-text)]">Administrator</div>
          </div>
          <span className="material-symbols-outlined text-[var(--sidebar-icon)] group-hover:text-[var(--accent)] transition-colors">expand_more</span> 
        </div>
        {/* Context menu would go here if implemented */} 
      </div>
    </div>
  );
}

export default Sidebar;