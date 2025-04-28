import Sidebar from '../components/sidebar';

export default function Orders() {
  return (
    <div className="flex h-screen bg-[var(--secondary-bg)] font-inter">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-text)] mb-6">Orders</h1>

        <div className="bg-[var(--primary-bg)] p-4 rounded-lg shadow-md mb-6 border border-[var(--border-color)]">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Search Order ID or Customer..." 
              className="flex-grow p-2 border border-[var(--border-color)] rounded-md bg-[var(--secondary-bg)] text-[var(--primary-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] placeholder:text-[var(--secondary-text)]" 
            />
            <select className="p-2 border border-[var(--border-color)] rounded-md bg-[var(--secondary-bg)] text-[var(--primary-text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)]">
              <option className="text-[var(--primary-text)] bg-[var(--primary-bg)]">Filter by Status</option>
              <option className="text-[var(--primary-text)] bg-[var(--primary-bg)]">Pending</option>
              <option className="text-[var(--primary-text)] bg-[var(--primary-bg)]">Processing</option>
              <option className="text-[var(--primary-text)] bg-[var(--primary-bg)]">Shipped</option>
              <option className="text-[var(--primary-text)] bg-[var(--primary-bg)]">Delivered</option>
              <option className="text-[var(--primary-text)] bg-[var(--primary-bg)]">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-[var(--primary-bg)] p-6 rounded-lg shadow-md border border-[var(--border-color)]">
          <h2 className="text-xl font-semibold text-[var(--primary-text)] mb-4">Order List</h2>
          <p className="text-[var(--secondary-text)] mb-4 text-sm">A table displaying order ID, customer, date, total amount, and status would go here.</p>
          <div className="border border-[var(--border-color)] rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-[var(--border-color)]">
              <thead className="bg-[var(--secondary-bg)]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--secondary-text)] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-[var(--primary-bg)] divide-y divide-[var(--border-color)]">
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-[var(--secondary-text)]">No order data available...</td>
                </tr>
                {/* Order rows would be mapped here */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 