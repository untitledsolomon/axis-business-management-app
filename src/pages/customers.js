import Sidebar from '../components/sidebar';

export default function Customers() {
  return (
    <div className="flex h-screen bg-[var(--secondary-bg)] font-inter">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-text)]">Customers</h1>
          <button className="bg-[var(--brand-accent)] hover:opacity-90 text-[var(--brand-accent-fg)] font-medium py-2 px-4 rounded-lg flex items-center transition duration-150 shadow-sm">
            <span className="material-symbols-outlined mr-2 text-sm">add</span>
            Add Customer
          </button>
        </div>
        
        <div className="bg-[var(--primary-bg)] p-6 rounded-lg shadow-md border border-[var(--border-color)]">
          <h2 className="text-xl font-semibold text-[var(--primary-text)] mb-4">Customer List</h2>
          <p className="text-[var(--secondary-text)] mb-4 text-sm">A table displaying customer names, email, join date, and status would go here.</p>
          <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-[var(--border-color)]">
              <thead className="bg-[var(--secondary-bg)]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-[var(--primary-bg)] divide-y divide-[var(--border-color)]">
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-[var(--secondary-text)]">No customer data available...</td>
                </tr>
                {/* Customer rows would be mapped here */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 