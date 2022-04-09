
import { AppThemeProvider } from 'src/theme';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary ';
import { IdleTimer } from '../components/IdleTimer/IdleTimer';
import logo from '../logo.svg';
import styles from './App.css';

const App = () => {
  return (
    <ErrorBoundary name={process.env.REACT_APP_NAME?.toString() || ''}>
      <IdleTimer />
      <AppThemeProvider>
        <div className={styles.base}>
          <header className={styles.header}>
            <img src={logo} className={styles.logo} alt="logo" />
          </header>
        </div>
      </AppThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
