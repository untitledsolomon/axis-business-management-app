import Sidebar from '../components/sidebar';

export default function Reports() {
  return (
    <div className="flex h-screen bg-[var(--secondary-bg)] font-inter">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-text)] mb-6">Reports</h1>

        <div className="bg-[var(--primary-bg)] p-6 rounded-lg shadow-md mb-6 border border-[var(--border-color)]">
          <h2 className="text-xl font-semibold text-[var(--primary-text)] mb-4">Generate Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-[var(--primary-text)] mb-1">Report Type</label>
              <select 
                id="reportType" 
                className="w-full p-2 border border-[var(--border-color)] rounded-md bg-[var(--secondary-bg)] text-[var(--primary-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]"
              >
                <option className="text-[var(--primary-text)] bg-[var(--primary-bg)]">Select Report...</option>
                <option className="text-[var(--primary-text)] bg-[var(--primary-bg)]">Sales Summary</option>
                <option className="text-[var(--primary-text)] bg-[var(--primary-bg)]">Customer Activity</option>
                <option className="text-[var(--primary-text)] bg-[var(--primary-bg)]">Inventory Levels</option>
                <option className="text-[var(--primary-text)] bg-[var(--primary-bg)]">Revenue by Product</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-[var(--primary-text)] mb-1">Date Range</label>
              <input 
                type="text" 
                id="dateRange" 
                placeholder="Select Date Range" 
                className="w-full p-2 border border-[var(--border-color)] rounded-md bg-[var(--secondary-bg)] text-[var(--primary-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] placeholder:text-[var(--secondary-text)]" 
              />
            </div>
            <div className="self-end">
              <button className="w-full bg-[var(--brand-accent)] hover:opacity-90 text-[var(--brand-accent-fg)] font-medium py-2 px-4 rounded-lg flex items-center justify-center transition duration-150 shadow-sm">
                <span className="material-symbols-outlined mr-2 text-sm">summarize</span>
                Generate
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[var(--primary-bg)] p-6 rounded-lg shadow-md border border-[var(--border-color)]">
          <h2 className="text-xl font-semibold text-[var(--primary-text)] mb-4">Report View</h2>
          <p className="text-[var(--secondary-text)] text-center py-8">Select report criteria above to view the generated report here (e.g., charts, tables).</p>
        </div>
      </main>
    </div>
  );
} 