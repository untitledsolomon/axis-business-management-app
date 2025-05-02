
import { AppHeader } from "@/components/layouts/AppHeader";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const SettingsTab = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 font-medium text-sm rounded-t-md transition-colors duration-150 border-b-2 
              ${active 
                ? 'border-[var(--brand-accent)] text-[var(--brand-accent)]' 
                : 'border-transparent text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:border-gray-300'}`}
  >
    {label}
  </button>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile'); // State to track active tab

  return (
    <AppLayout>
      <AppHeader title="Settings" />
      <div className="p-6 overflow-auto">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>
              Configure system preferences and business settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Card uses primary-bg */}
            <div className="bg-[var(--primary-bg)] rounded-lg shadow-md overflow-hidden border border-[var(--border-color)]">
              {/* Tabs use theme colors */}
              <div className="flex border-b border-[var(--border-color)] px-4 space-x-1">
                <SettingsTab label="Profile" active={activeTab === 'Profile'} onClick={() => setActiveTab('Profile')} />
                <SettingsTab label="Team Members" active={activeTab === 'Team'} onClick={() => setActiveTab('Team')} />
                <SettingsTab label="Billing" active={activeTab === 'Billing'} onClick={() => setActiveTab('Billing')} />
                <SettingsTab label="Integrations" active={activeTab === 'Integrations'} onClick={() => setActiveTab('Integrations')} />
                <SettingsTab label="API Keys" active={activeTab === 'API'} onClick={() => setActiveTab('API')} />
              </div>

              {/* Settings Content Area uses theme text colors */}
              <div className="p-6">
                {activeTab === 'Profile' && (
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--primary-text)] mb-4">User Profile</h2>
                    <p className="text-[var(--secondary-text)]">Placeholder for profile settings form (Name, Email, Password Change).</p>
                    {/* Add form fields here */} 
                  </div>
                )}
                {activeTab === 'Team' && (
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--primary-text)] mb-4">Team Members</h2>
                    <p className="text-[var(--secondary-text)]">Placeholder for managing team members, roles, and permissions.</p>
                    {/* Add team member list and invite options */} 
                  </div>
                )}
                {activeTab === 'Billing' && (
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--primary-text)] mb-4">Billing & Subscription</h2>
                    <p className="text-[var(--secondary-text)]">Placeholder for viewing current plan, payment methods, and invoices.</p>
                    {/* Add subscription details and billing history */} 
                  </div>
                )}
                {activeTab === 'Integrations' && (
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--primary-text)] mb-4">Integrations</h2>
                    <p className="text-[var(--secondary-text)]">Placeholder for connecting third-party services (e.g., Stripe, Slack, QuickBooks).</p>
                    {/* Add integration cards/options */} 
                  </div>
                )}
                {activeTab === 'API' && (
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--primary-text)] mb-4">API Keys</h2>
                    <p className="text-[var(--secondary-text)]">Placeholder for generating and managing API keys for developers.</p>
                    {/* Add API key generation and list */} 
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
