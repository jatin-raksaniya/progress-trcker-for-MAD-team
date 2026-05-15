import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { 
  LayoutDashboard, FileText, Settings, Bell, Search, 
  BookOpen, Palette, Globe, Plus, Download, Clock,
  Upload, User, Shield, BellRing
} from 'lucide-react';
import { departmentData, recentActivities, statsData } from './data';
import './App.css';

const getDepartmentIcon = (dept) => {
  switch(dept) {
    case 'Education': return <BookOpen size={24} />;
    case 'Graphics & Branding': return <Palette size={24} />;
    case 'Website Development': return <Globe size={24} />;
    default: return <FileText size={24} />;
  }
};

const getDepartmentClass = (dept) => {
  switch(dept) {
    case 'Education': return 'education';
    case 'Graphics & Branding': return 'graphics';
    case 'Website Development': return 'website';
    default: return '';
  }
};

const DashboardHome = () => (
  <div className="dashboard-content animate-fade-in">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Marketing Overview</h1>
        <p>May 1 - May 15, 2026</p>
      </div>
      <button className="btn btn-secondary">
        <Download size={18} />
        <span>Export Report</span>
      </button>
    </div>

    {/* Stats Grid */}
    <div className="stats-grid">
      {statsData.map((stat, idx) => (
        <div className="card stat-card glass" key={idx}>
          <p>{stat.label}</p>
          <div className="stat-value">
            {stat.value}
            <span className="stat-increase">{stat.increase}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Charts Area */}
    <div className="charts-grid">
      <div className="card chart-card glass">
        <h3>Work by Department</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {departmentData.map((dept, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: dept.color }}></div>
              {dept.name}
            </div>
          ))}
        </div>
      </div>

      <div className="card chart-card glass">
        <h3>Activity Breakdown</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="card recent-activity glass">
      <div className="activity-header">
        <h3>Recent Work Logs</h3>
        <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>View All</button>
      </div>
      <div className="activity-list">
        {recentActivities.map(activity => (
          <div className="activity-item" key={activity.id}>
            <div className={`activity-icon ${getDepartmentClass(activity.department)}`}>
              {getDepartmentIcon(activity.department)}
            </div>
            <div className="activity-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-desc">{activity.description}</div>
                </div>
                <span className={`badge badge-${getDepartmentClass(activity.department)}`}>
                  {activity.department}
                </span>
              </div>
              <div className="activity-meta">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={14} /> {activity.date}
                </span>
                <span className="status-indicator">
                  <span className={`status-dot ${activity.status === 'Completed' ? 'completed' : 'progress'}`}></span>
                  {activity.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ReportsPage = () => (
  <div className="dashboard-content animate-fade-in">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Reports Manager</h1>
        <p>Generate, view, and upload departmental reports.</p>
      </div>
      <button className="btn btn-primary">
        <Plus size={18} />
        <span>Generate New Report</span>
      </button>
    </div>

    <div className="card glass" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderWidth: '2px', padding: '3rem' }}>
      <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
        <Upload size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Upload Existing Report</h3>
        <p style={{ marginBottom: '1.5rem' }}>Drag and drop your Excel or Word files here</p>
        <button className="btn btn-secondary">Browse Files</button>
      </div>
    </div>

    <h3 style={{ marginBottom: '1rem' }}>Recent Reports</h3>
    <div className="activity-list">
      {[
        { id: 1, name: 'Marketing_Department_Progress_Report_May2026.docx', date: 'May 15, 2026', size: '23 KB', type: 'Word' },
        { id: 2, name: 'Q1_Education_Stats_2026.xlsx', date: 'April 02, 2026', size: '1.2 MB', type: 'Excel' },
        { id: 3, name: 'Graphics_Brand_Book_Draft.docx', date: 'March 28, 2026', size: '5.4 MB', type: 'Word' }
      ].map(report => (
        <div className="activity-item" key={report.id} style={{ alignItems: 'center' }}>
          <div className="activity-icon" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}>
            <FileText size={24} />
          </div>
          <div className="activity-content" style={{ flex: 1 }}>
            <div className="activity-title">{report.name}</div>
            <div className="activity-meta">
              <span>{report.date}</span> • <span>{report.size}</span>
            </div>
          </div>
          <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            <Download size={16} /> Download
          </button>
        </div>
      ))}
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="dashboard-content animate-fade-in">
    <div style={{ marginBottom: '2rem' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Settings</h1>
      <p>Manage your account, preferences, and permissions.</p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      {/* Profile Settings */}
      <div className="card glass">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <User size={24} color="var(--accent-primary)" />
          <h3 style={{ margin: 0 }}>Profile Information</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
            <input type="text" defaultValue="Admin User" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email Address</label>
            <input type="email" defaultValue="admin@exploreyourspace.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
          </div>
          <button className="btn btn-primary" style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}>Save Changes</button>
        </div>
      </div>

      {/* Preferences */}
      <div className="card glass">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <BellRing size={24} color="var(--warning)" />
          <h3 style={{ margin: 0 }}>Notifications</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
            <span>Email Alerts for New Reports</span>
            <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderTop: '1px solid var(--border-color)' }}>
            <span>Daily Summary Notifications</span>
            <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderTop: '1px solid var(--border-color)' }}>
            <span>Task Completion Alerts</span>
            <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }} />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="card glass">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Shield size={24} color="var(--success)" />
          <h3 style={{ margin: 0 }}>Security</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>Change Password</button>
          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>Two-Factor Authentication (2FA)</button>
          <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)' }}>Sign Out All Devices</button>
        </div>
      </div>
    </div>
  </div>
);


const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <LayoutDashboard size={20} />
          </div>
          <span>WorkTracker</span>
        </div>
        
        <nav className="nav-links">
          <div 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FileText size={20} />
            <span>Reports</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-wrapper">
        <header className="header">
          <div className="header-search">
            <Search size={18} color="var(--text-secondary)" />
            <input type="text" placeholder="Search tasks, departments..." />
          </div>
          
          <div className="header-actions">
            <button className="btn btn-primary">
              <Plus size={18} />
              <span>Log Work</span>
            </button>
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <div className="user-profile">
              <div className="avatar">A</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Admin</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Marketing Dept</div>
              </div>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && <DashboardHome />}
        {activeTab === 'reports' && <ReportsPage />}
        {activeTab === 'settings' && <SettingsPage />}

      </main>
    </div>
  );
};

export default App;
