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
        {/* Simplified Logo - SVG added */}
        <svg className="w-auto h-8 mx-auto mb-2 fill-[var(--primary-text)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.68 95.62">
           <g><path d="M63.9,69.84c-1.75,2-2.91,2.12-3.91.32-2.23-3.99-3.87-8.29-6.22-12.32.85.07,1.63.33,2.2.11,1.51-.59,1.95-.21,1.31,1.53,2.88-1.79,4.48-3.96,4.47-7.17,0-.89.07-1.87.45-2.64.73-1.51.79-3.06.88-4.66.11-1.68-.03-3.43.72-5,.51-1.11.23-1.86-.67-2.64-2.75-2.44-5.63-4.7-8.81-6.57-.45-.27-1.04-.49-.97-1.13.16-1.41-.53-2.43-1.53-3.31,2.87-1.57,3.62-3.34,2.4-5.78-.2.31-.37.56-.55.81-.52.75-1.2,1.23-2.15,1.07-1.01-.19-1.56-.89-1.83-1.82-.36-1.21.04-2.28.67-3.32,2.22-3.7,4.39-7.39,6.57-11.1.27-.44.72-.81.56-1.53-2.18-.15-3.98.81-5.73,1.94-.52.33-.37.79-.29,1.28.41,2.72-.43,4.35-2.94,5.73-4.06,2.22-11.06.41-13.57-3.48-1.19-1.86-1.04-3.52.67-4.95.85-.71.95-1.25.32-2.1-3.15-4.19-3.4-4.02-6.47-.17-.69.87-.83,1.48.24,2.34,2.07,1.63,1.9,3.94-.23,5.46-2.98,2.14-6.27,3.11-9.92,2.56-3.76-.56-6.11-1.84-5.47-6.15.17-1.2-.35-2.04-1.33-2.67-.93-.61-1.92-1.13-3.02-1.39-.32-.07-.71-.43-1.01,0-.25.33-.09.72.04,1.07,1.53,4,3.11,7.99,4.59,12.02.37,1.01,1.03,1.08,1.87.92,1.99-.35,3.95-.77,5.94-1.09,6.86-1.11,13.67-1.05,20.38.87t.03.01h-.03c-.21.41-.64.15-.93.29h-.03c-1.59-.16-3.16-.36-4.75-.49-6.95-.56-13.8.11-20.55,1.82-.79.19-1.09.55-.95,1.47.32,2.07.27,4.14-.71,6.07-.84,1.64-2.3,2.47-4,2.32-1.44-.12-2.64-1.27-3.15-2.99-.11-.37.08-1.03-.48-1.01-.32,0-.67.47-.95.79-3.39,3.91-2.71,10.06,1.49,13.11.75.55,1.03.88.25,1.67-2.98,2.98-3.74,6.65-3.34,10.7.4,4.12,1.76,7.95,3.39,11.7,1.24,2.87,2.94,5.53,3.9,8.53.73,2.28-.27,4.12-2.55,4.84-1.09.36-2.18.28-3.31.11-1.09-.17-1.87-1.03-2.95-1.43,1.29,7.25,7.95,11.86,14.92,10.49,7.11-1.4,10.33-7.9,7.19-14.44-.32-.65-.79-1.25-.85-2.03,1.78-.44,3.58-.61,5.29-1.27.44-.16,1.03-.37,1-.88-.01-.68-.72-.4-1.13-.51-5.37-1.39-9.81-4.04-12.48-9.09-1.31-2.48-1.51-5.1-.72-8.21,4.02,7.46,10.61,11.81,16.68,16.68,2.46,1.98,4.72,4.12,6.71,6.58,6.65,8.18.19,18.26-7.94,19.66-2.52.43-4.94-.03-7.51-.45.49.91,1.28,1.17,1.96,1.52,4.67,2.42,9.58,3.56,14.88,3.08,9.93-.89,16.44-6.86,17.83-16.6.16-1.12.35-1.59,1.6-1.35,1.87.35,3.54-.16,4.51-1.92,1.04-1.88,1.05-3.82.01-5.79ZM16.74,73.35c1,2.26.36,4.71-1.63,6.25-2.23,1.7-5.1,1.59-7.46-.43,5.34,1.17,9-.53,9.09-5.82ZM47.69,84.5c-.56,1.57-1.48,2.92-2.78,4.06.96-2.19,1.82-4.35,1.88-6.81.19-5.87-2.5-10.53-6.1-14.8-3.23-3.84-7.18-6.93-10.96-10.21-2-1.73-3.95-3.52-5.31-5.87,3.16,2.31,6.34,4.63,9.52,6.94,3.47,2.54,7.07,4.92,9.82,8.31,4.4,5.46,6.35,11.46,3.92,18.38ZM53.69,81.7c.21-2.76-.03-5.49-.8-8.15-1.75-6.05-5.7-10.49-10.45-14.29-4.48-3.59-9.14-6.98-13.67-10.52-4.4-3.44-6.47-7.9-5.43-13.56.28-1.51.16-2.52-1.71-3.02-1.94-.49-3.03-2.08-3.15-4.15-.11-1.99.41-3.74,2.3-4.74,1.9-1.01,3.79-.85,5.58.33.11.07.12.25.24.55-1.72.09-3.51-.28-4.74,1.21-.45.55-.71,1.2-.68,1.92.08,2.34,1.55,3.11,6.57,3.35-2.12,4.3-2.71,8.54.25,12.68-.77-3.46-1.19-6.85.69-10.13,1.92-3.38,4.96-4.72,8.86-4.91-1.27-1.61-2.86-2.2-4.67-2.59,3.1-.72,5.58-.32,9.69,1.57.15-.99-.65-1.49-1.01-2.2,2.22-.67,6.49.6,7.94,2.35.95,1.13.13,1.43-1.05,1.71,4.82,2.67,9.64,4.98,13.89,8.73-1.37.2-2.66-.17-3.66.71-.55.49-1.27.89-1.15,1.76.11.8.93.89,1.48.99,1.32.24,1.53.99,1.45,2.16-.21,2.84-1.75,4.36-4.59,4.4-1.59.03-3.19-.13-4.78.19-1.43.28-2.07,1.09-1.82,2.28.24,1.2,1.15,1.67,2.62,1.23,2.35-.69,4.58-1.68,6.63-3.02,1.03-.68,1.36-.29,1.57.69.41,1.88.61,3.75-.19,5.86-.28-.97-.68-1.11-1.39-.55-.93.73-2.03.71-3.19.48-1.94-.36-3.84-.76-5.5-1.92-2.75-1.92-2.95-4.84-.52-7.14.37-.36.75-.72,1.25-1.2-.87-.21-1.57.01-2.11.28-1.55.76-2.84.33-4.19-.47-1.92-1.12-3.88-2.18-5.83-3.26-3.3-1.83-5.18-5.49-1.9-8.76.21-.21.31-.55.55-1.01-2.26.13-3.75,1.28-4.91,2.88-2.59,3.59-2.08,7.78,1.32,10.86,2.06,1.86,4.44,3.28,6.77,4.78,3.67,2.38,7.22,4.88,10.08,8.25,5.79,6.78,6.62,15.56,3.34,23.37Z"/><path d="M21.94,88.19c2.76-.1,5.47-.37,8.05-1.43,7.35-3.02,9.35-10.46,4.5-16.77-.19-.24-.38-.49-.66-.84,2.54,1.01,5.26,5.36,5.48,8.59.33,4.74-1.66,8.23-5.82,10.46-3.83,2.05-7.71,2.12-11.56,0Z"/><path d="M8.22,67.8c-3.23-3.88-5.73-7.94-7.22-12.59-.92-2.87-1.38-5.8-.61-8.78.74-2.86,2.46-4.99,4.95-6.53.29.33.13.54-.05.74-3.54,3.92-3.72,8.46-2.55,13.3,1.01,4.17,2.94,7.94,4.84,11.73.29.58.82,1.12.65,2.14Z"/><path d="M48.29,32.41c-.13-.63-.52-1.24-1.35-1-1.75.51-3.26,1.35-4.22,2.88,2.35,1.84,5.08-.21,7.45,1.05-1.07-.8-1.63-1.75-1.88-2.94ZM44.86,33.48c.75-.31,1.75.36,2.19-.88-.37,1.66-.97,1.87-2.19.88Z"/><path d="M48.29,32.41c-.13-.63-.52-1.24-1.35-1-1.75.51-3.26,1.35-4.22,2.88,2.35,1.84,5.08-.21,7.45,1.05-1.07-.8-1.63-1.75-1.88-2.94ZM44.86,33.48c.75-.31,1.75.36,2.19-.88-.37,1.66-.97,1.87-2.19.88Z"/></g>
        </svg>
        <span>Axis App</span> { /* Removed relative positioning for simplicity */}
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