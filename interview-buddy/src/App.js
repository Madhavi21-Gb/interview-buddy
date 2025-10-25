import React, { useState } from 'react';

const UserManagementApp = () => {
  const [currentView, setCurrentView] = useState('list');
  const [showAddUserPanel, setShowAddUserPanel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [profileImage, setProfileImage] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  
  const [users, setUsers] = useState([
    { id: 1, name: 'Dave Richards', email: 'dave@mail.com', phone: '+91 8332883854' },
    { id: 2, name: 'Abhishek Hari', email: 'hari@mail.com', phone: '+91 9876543210' },
    { id: 3, name: 'Nishta Gupta', email: 'nishta@mail.com', phone: '+91 8765432109' }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    contact: ''
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.contact
      };
      setUsers([...users, user]);
      setShowAddUserPanel(false);
      setNewUser({ name: '', email: '', contact: '' });
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setCurrentView('profile');
    setActiveTab('basic');
    setProfileImage(null);
    setResumeFile(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedUser(null);
    setShowAddUserPanel(false);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file.name);
    }
  };

  // Profile View - All 3 tabs
  if (currentView === 'profile' && selectedUser) {
    return (
      <div style={styles.app}>
        <header style={styles.header}>
          <div style={styles.logo} onClick={handleBackToList}>
            <div style={styles.logoBox}>LOGO</div>
            <div style={styles.logoText}>
              <span style={styles.logoEstd}>ESTD</span>
              <span style={styles.logoYear}>2025</span>
            </div>
          </div>
          <div style={styles.headerIcons}>
            <button style={styles.iconBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
            </button>
            <button style={styles.iconBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button style={{...styles.iconBtn, ...styles.userIcon}} onClick={handleBackToList}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(108, 92, 231, 0.7)" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </header>

        <div style={styles.profileContainer}>
          <div style={styles.profileHeader}>
            <div style={{...styles.profileAvatar, ...(activeTab === 'experience' && profileImage === null ? styles.profileAvatarLocked : {})}}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" style={styles.profileImage} />
              ) : (
                <div style={styles.avatarIcon}>
                  <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="rgba(108, 92, 231, 0.7)" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
              {activeTab === 'experience' && (
                <label style={styles.uploadAvatarBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(108, 92, 231, 0.7)" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <input type="file" accept="image/*" onChange={handleProfileImageChange} style={{display: 'none'}} />
                </label>
              )}
            </div>
            <div style={styles.profileInfo}>
              <h2 style={styles.profileName}>{selectedUser.name}</h2>
              <div style={styles.profileContact}>
                <span>{selectedUser.email}</span>
                <button style={styles.copyBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
              <div style={styles.profilePhone}>{selectedUser.phone}</div>
            </div>
          </div>

          <div style={styles.tabs}>
            <button 
              style={{...styles.tab, ...(activeTab === 'basic' ? styles.tabActive : {})}}
              onClick={() => setActiveTab('basic')}
            >
              Basic Info
            </button>
            <button 
              style={{...styles.tab, ...(activeTab === 'education' ? styles.tabActive : {})}}
              onClick={() => setActiveTab('education')}
            >
              Education & skills
              {activeTab === 'education' && <span style={styles.notificationDot}></span>}
            </button>
            <button 
              style={{...styles.tab, ...(activeTab === 'experience' ? styles.tabActive : {})}}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
          </div>

          {activeTab === 'basic' && (
            <div style={styles.contentSection}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>Basic Details</h3>
                <button style={styles.editBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(108, 92, 231, 0.7)" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </div>
              
              {/* Row 1: First name, Last name, Email ID */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>First name</label>
                  <input type="text" placeholder="e.g. John" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Last name</label>
                  <input type="text" placeholder="e.g. Doe" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email ID</label>
                  <input type="email" placeholder="e.g. mrnobody@mail.com" style={styles.input} />
                </div>
              </div>

              {/* Row 2: Year of birth + Gender (combined width of first name), Phone number, Alternate Phone no */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                <div style={{display: 'flex', gap: '20px'}}>
                  <div style={{...styles.formGroup, flex: 1}}>
                    <label style={styles.label}>Year of birth</label>
                    <select style={styles.input}>
                      <option>YYYY</option>
                    </select>
                  </div>
                  <div style={{...styles.formGroup, flex: 1}}>
                    <label style={styles.label}>Gender</label>
                    <select style={styles.input}>
                      <option>Select an option</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone number</label>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <select style={{...styles.input, width: '80px', flexShrink: 0}}>
                      <option>🇮🇳 +91</option>
                      <option>🇺🇸 +1</option>
                      <option>🇬🇧 +44</option>
                    </select>
                    <input type="tel" placeholder="8332883854" style={{...styles.input, flex: 1}} />
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Alternate Phone no</label>
                  <input type="tel" placeholder="e.g. 9876543210" style={styles.input} />
                </div>
              </div>

              {/* Row 3: Address (2 rows height, firstname width) + Pincode/Domicile state in one row, Domicile country below */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px'}}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Address</label>
                  <textarea placeholder="Enter here" rows="5" style={{...styles.input, resize: 'vertical', minHeight: '110px'}}></textarea>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Pincode</label>
                    <input type="text" placeholder="Enter here" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Domicile country</label>
                    <select style={styles.input}>
                      <option>Select an option</option>
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Domicile state</label>
                  <select style={styles.input}>
                    <option>Select an option</option>
                    <option>Andhra Pradesh</option>
                    <option>Karnataka</option>
                    <option>Maharashtra</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div style={styles.contentSection}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>Education Details</h3>
                <button style={styles.editBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(108, 92, 231, 0.7)" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </div>
              <div style={styles.formGrid}>
                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                  <label style={styles.label}>School / College</label>
                  <input type="text" placeholder="e.g. Lincoln College" style={styles.input} />
                </div>
                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                  <label style={styles.label}>Highest degree or equivalent</label>
                  <input type="text" placeholder="e.g. Bachelors in Technology" style={styles.input} />
                </div>
                <div style={{...styles.formGroup, gridColumn: '1 / -1'}}>
                  <label style={styles.label}>Course</label>
                  <input type="text" placeholder="e.g. Computer science engineering" style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Year of completion</label>
                  <select style={styles.input}>
                    <option>YYYY</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Grade</label>
                  <input type="text" placeholder="Enter here" style={styles.input} />
                </div>
              </div>

              <div style={{...styles.sectionHeader, marginTop: '40px'}}>
                <h3 style={styles.sectionTitle}>Skills & Projects</h3>
                <button style={styles.editBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(108, 92, 231, 0.7)" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Skills</label>
                  <textarea placeholder="Enter here" rows="4" style={{...styles.input, resize: 'vertical'}}></textarea>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Projects</label>
                  <textarea placeholder="Enter here" rows="4" style={{...styles.input, resize: 'vertical'}}></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div style={styles.contentSection}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>Work Experience</h3>
                <button style={styles.editBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(108, 92, 231, 0.7)" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div style={{...styles.formGroup, width: '100%'}}>
                  <label style={styles.label}>Domain</label>
                  <input type="text" placeholder="e.g. Technology" style={styles.input} />
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px'}}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Sub-domain</label>
                    <input type="text" placeholder="e.g. MERN Stack" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Experience</label>
                    <select style={styles.input}>
                      <option>Select an option</option>
                    </select>
                  </div>
                </div>

                <div style={{...styles.formGroup, width: '100%', marginTop: '20px'}}>
                  <label style={styles.label}>Domain</label>
                  <input type="text" placeholder="e.g. Technology" style={styles.input} />
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px'}}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Sub-domain</label>
                    <input type="text" placeholder="e.g. MERN Stack" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Experience</label>
                    <select style={styles.input}>
                      <option>Select an option</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '50px'}}>
                <div style={{border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', background: 'white'}}>
                  <div style={styles.sectionHeader}>
                    <h3 style={styles.sectionTitle}>LinkedIn</h3>
                    <button style={styles.editBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(108, 92, 231, 0.7)" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Profile URL</label>
                    <input type="text" placeholder="linkedin.com/in/mrbean" style={styles.input} />
                  </div>
                </div>

                <div style={{border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', background: 'white'}}>
                  <div style={styles.sectionHeader}>
                    <h3 style={styles.sectionTitle}>Resume</h3>
                    <button style={styles.editBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(108, 92, 231, 0.7)" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </div>
                  <div style={{marginTop: '10px'}}>
                    {resumeFile ? (
                      <div style={styles.resumeFile}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                          <span style={{color: '#666', fontSize: '14px'}}>{resumeFile}</span>
                        </div>
                      </div>
                    ) : (
                      <label style={styles.uploadResumeBox}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span style={{marginTop: '10px', fontSize: '14px', color: '#666', fontWeight: '500'}}>Click to upload resume</span>
                        <small style={{marginTop: '4px', fontSize: '12px', color: '#999'}}>PDF, DOC, DOCX (Max 5MB)</small>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} style={{display: 'none'}} />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // USER LIST VIEW
  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoBox}>LOGO</div>
          <div style={styles.logoText}>
            <span style={styles.logoEstd}>ESTD</span>
            <span style={styles.logoYear}>2025</span>
          </div>
        </div>
        <div style={styles.headerIcons}>
          <button style={styles.iconBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
            </svg>
          </button>
          <button style={styles.iconBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
          <button style={{...styles.iconBtn, ...styles.userIcon}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(108, 92, 231, 0.7)" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </header>

      <div style={{display: 'flex', position: 'relative', minHeight: 'calc(100vh - 66px)'}}>
        <div style={{flex: 1, padding: '40px 60px', transition: 'margin-right 0.3s ease', marginRight: showAddUserPanel ? '50%' : '0'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
            <h1 style={{fontSize: '32px', fontWeight: '600', margin: 0}}>Users</h1>
            <button style={styles.addUserBtn} onClick={() => setShowAddUserPanel(true)}>
              + Add user
            </button>
          </div>

          <div style={styles.usersTable}>
            <div style={styles.tableHeader}>
              <div style={{width: '100px'}}>Sr. No</div>
              <div style={{flex: 1}}>User name</div>
              <div style={{flex: 1}}>E-mail</div>
              <div style={{width: '150px'}}>Action</div>
            </div>

            {users.map((user, index) => (
              <div key={user.id} style={styles.tableRow}>
                <div style={{width: '100px'}}>{index + 1}</div>
                <div style={{flex: 1, fontWeight: '500', color: '#555'}}>{user.name}</div>
                <div style={{flex: 1, color: '#666'}}>{user.email}</div>
                <div style={{width: '150px', display: 'flex', gap: '15px'}}>
                  <button style={styles.actionBtn} onClick={() => handleViewUser(user)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button style={styles.actionBtn} onClick={() => handleDeleteUser(user.id)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showAddUserPanel && (
          <>
            <div style={styles.panelOverlay} onClick={() => setShowAddUserPanel(false)}></div>
            <div style={styles.sidePanel}>
              <div style={styles.panelHeader}>
                <h2 style={{fontSize: '22px', fontWeight: '600', margin: 0}}>Add User</h2>
                <button style={styles.closeBtn} onClick={() => setShowAddUserPanel(false)}>✕</button>
              </div>
              <div style={styles.panelContent}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Name of the user</label>
                  <input 
                    type="text" 
                    placeholder="Type here"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    style={styles.input}
                  />
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>E-mail</label>
                    <input 
                      type="email" 
                      placeholder="Type here"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Contact</label>
                    <input 
                      type="text" 
                      placeholder="Type here"
                      value={newUser.contact}
                      onChange={(e) => setNewUser({...newUser, contact: e.target.value})}
                      style={styles.input}
                    />
                  </div>
                </div>
              </div>
              <div style={styles.panelFooter}>
                <button style={styles.cancelBtn} onClick={() => setShowAddUserPanel(false)}>Cancel</button>
                <button style={styles.addBtn} onClick={handleAddUser}>Add</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  app: {
    minHeight: '100vh',
    background: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  },
  header: {
    background: 'white',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
  },
  logoBox: {
    border: '2px solid black',
    padding: '6px 16px',
    fontWeight: '700',
    fontSize: '14px',
    color: 'black',
    letterSpacing: '0.5px',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0',
  },
  logoEstd: {
    color: 'black',
    fontSize: '9px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    lineHeight: '1',
  },
  logoYear: {
    color: 'black',
    fontSize: '9px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    lineHeight: '1.2',
  },
  headerCenter: {
    color: 'black',
    fontSize: '10px',
    fontWeight: '400',
    letterSpacing: '0.5px',
    marginLeft: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  headerIcons: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  iconBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    borderRadius: '8px',
    transition: 'background 0.3s',
  },
  userIcon: {
    background: 'rgba(108, 92, 231, 0.1)',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
  },
  addUserBtn: {
    background: '#6C5CE7',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  usersTable: {
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
  },
  tableHeader: {
    display: 'flex',
    padding: '20px 30px',
    background: '#fafafa',
    fontWeight: '600',
    color: '#666',
    fontSize: '14px',
  },
  tableRow: {
    display: 'flex',
    padding: '25px 30px',
    borderTop: '1px solid #f0f0f0',
    alignItems: 'center',
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    color: '#999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
  sidePanel: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '50%',
    height: '100vh',
    background: 'white',
    boxShadow: '-2px 0 20px rgba(0,0,0,0.1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  },
  panelHeader: {
    padding: '25px 30px',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fafafa',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
    padding: 0,
    width: '30px',
    height: '30px',
  },
  panelContent: {
    flex: 1,
    padding: '30px',
    overflowY: 'auto',
  },
  panelFooter: {
    padding: '20px 30px',
    borderTop: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    background: '#fafafa',
  },
  cancelBtn: {
    background: '#f0f0f0',
    color: '#666',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '6px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  addBtn: {
    background: '#6C5CE7',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '6px',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  profileContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 60px',
  },
  profileHeader: {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    display: 'flex',
    gap: '30px',
    marginBottom: '30px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
  },
  profileAvatar: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: '#e8e5f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  profileAvatarLocked: {
    background: '#e8e5f7',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  avatarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadAvatarBtn: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    background: 'rgba(108, 92, 231, 0.1)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  profileInfo: {
    flex: 1,
    paddingTop: '20px',
  },
  profileName: {
    fontSize: '32px',
    marginBottom: '10px',
    fontWeight: '600',
    margin: '0 0 10px 0',
  },
  profileContact: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#999',
    marginBottom: '8px',
  },
  copyBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#999',
    display: 'flex',
    alignItems: 'center',
  },
  profilePhone: {
    color: '#999',
    fontSize: '15px',
  },
  tabs: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    background: 'transparent',
    padding: '0',
  },
  tab: {
    background: 'rgba(0, 0, 0, 0.05)',
    border: '1px solid #e0e0e0',
    padding: '10px 20px',
    fontSize: '14px',
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: '500',
    position: 'relative',
    borderRadius: '6px',
    transition: 'all 0.3s',
  },
  tabActive: {
    color: 'rgba(108, 92, 231, 0.7)',
    borderColor: 'rgba(108, 92, 231, 0.3)',
    background: 'rgba(108, 92, 231, 0.1)',
  },
  notificationDot: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    width: '6px',
    height: '6px',
    background: '#ff6b35',
    borderRadius: '50%',
  },
  contentSection: {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
  },
  editBtn: {
    background: 'rgba(108, 92, 231, 0.1)',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
  },
  formGroup: {
    marginBottom: '0',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    background: '#fafafa',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  resumeFile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 20px',
    background: '#fafafa',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  viewBtn: {
    background: 'rgba(108, 92, 231, 0.1)',
    color: 'rgba(108, 92, 231, 0.7)',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
  },
  editResumeBtn: {
    background: 'rgba(108, 92, 231, 0.1)',
    color: 'rgba(108, 92, 231, 0.7)',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
  },
  uploadResumeBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: '2px dashed #e0e0e0',
    borderRadius: '8px',
    background: '#fafafa',
    cursor: 'pointer',
    minHeight: '120px',
  },
};

export default UserManagementApp;