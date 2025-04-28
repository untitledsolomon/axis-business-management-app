// src/components/StatCard.js

// Updated to use theme colors
const StatCard = ({ title, value, icon, accentColorClass }) => {
  // Use primary background, primary/secondary text for card body
  // Use the passed accent color class (e.g., 'border-brand-accent') for border and derive icon color
  const borderColorClass = accentColorClass || 'border-border'; // Default to theme border

  // Attempt to derive text color from border color, default to secondary text
  const deriveIconColor = (borderClass) => {
    if (!borderClass || !borderClass.startsWith('border-')) return 'text-secondary-text';
    // Simple replace might work for theme colors mapped in config
    return borderClass.replace('border-', 'text-'); 
    // More complex logic might be needed if borderClass can be arbitrary Tailwind colors
  }
  const iconColorClass = deriveIconColor(accentColorClass); 

  return (
    // Card background uses primary-bg (white/dark gray)
    <div className={`bg-primary-bg p-6 rounded-lg shadow-md flex items-center border-l-4 ${borderColorClass}`}>
      {/* Icon uses derived accent color */}
      <span className={`material-symbols-outlined text-3xl mr-4 ${iconColorClass}`}>{icon}</span>
      <div>
        {/* Title uses secondary text color */}
        <div className="text-sm font-medium text-secondary-text uppercase tracking-wider">{title}</div>
        {/* Value uses primary text color */}
        <div className="text-3xl font-semibold text-primary-text">{value}</div>
      </div>
    </div>
  );
}
  
export default StatCard;
  