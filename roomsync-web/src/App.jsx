import React, { useState, Component } from 'react';
import Scene3D from './components/Scene3D';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#FFF5F5', color: '#C53030', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Oops! Something went wrong.</h1>
          <pre style={{ marginTop: '20px', padding: '15px', backgroundColor: '#FEEBC8', borderRadius: '8px', overflow: 'auto', maxWidth: '90%' }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

import { createRoom, joinRoom } from './utils/roomStorage';

function App() {
  const [view, setView] = useState('landing');
  const [authMode, setAuthMode] = useState('signup');
  const [viewTitle, setViewTitle] = useState('');
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);

  const goToAuth = (mode, title) => {
    setAuthMode(mode);
    setViewTitle(title);
    setView('auth');
    window.scrollTo(0, 0);
  };

  const goToLanding = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  const handleAuth = (userData) => {
    setUser(userData);
    // Always go to dashboard. Dashboard handles strict "Room Setup" requirement internally.
    setView('dashboard');
    window.scrollTo(0, 0);
  };

  const handleRoomSetupComplete = (setupData) => {
    let activeRoom = null;

    if (setupData.type === 'create') {
      activeRoom = createRoom(setupData.name, user);
    } else if (setupData.type === 'join') {
      activeRoom = joinRoom(setupData.code, user);
    }

    if (activeRoom) {
      setRoom(activeRoom);
    } else {
      alert("Room not found! Please check the code.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setRoom(null);
    setView('landing');
    window.scrollTo(0, 0);
  };

  return (
    <ErrorBoundary>
      <div className="relative w-full min-h-screen">
        <Scene3D />

        {view === 'landing' && (
          <LandingPage
            onGetStarted={() => goToAuth('signup', 'Create Account')}
            onSignUp={() => goToAuth('signin', 'Sign Up')}
            onLogin={() => goToAuth('signin', 'Welcome Back')}
          />
        )}

        {view === 'auth' && (
          <AuthPage
            defaultMode={authMode}
            screenTitle={viewTitle}
            onBack={goToLanding}
            onAuth={handleAuth}
          />
        )}

        {view === 'dashboard' && (
          <DashboardPage
            user={user}
            room={room}
            onLogout={handleLogout}
            onJoinRoom={handleRoomSetupComplete}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
