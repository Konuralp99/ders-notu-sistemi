import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import CoursePage from './pages/CoursePage';
import HomePage from './pages/HomePage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 text-red-900 h-screen overflow-auto font-mono text-sm">
          <h1 className="text-2xl font-bold mb-4">Uygulama Hata Verdi 💥</h1>
          <div className="bg-white p-4 rounded border border-red-200">
            <p className="font-bold text-red-600 mb-2">{this.state.error && this.state.error.toString()}</p>
            <details className="whitespace-pre-wrap text-xs text-gray-600">
              <summary>Stack Trace</summary>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Sayfayı Yenile
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/course/:id" element={<CoursePage />} />
              {/* <Route path="/war-room" element={<WarRoomPage />} /> */}
            </Routes>
          </MainLayout>
        </AppProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
