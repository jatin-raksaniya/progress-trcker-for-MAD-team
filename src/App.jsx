import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend 
} from 'recharts';
import { 
  LayoutDashboard, FileText, Settings, Bell, Search, 
  BookOpen, Palette, Globe, Plus, Download, CheckCircle2, Clock
} from 'lucide-react';
import { departmentData, recentActivities, statsData } from './data';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
          <div className="nav-item">
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
      </main>
    </div>
  );
};

export default App;
