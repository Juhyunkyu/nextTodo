import { ThemeProvider } from './contexts/ThemeContext';
import { TodoProvider } from './contexts/TodoContext';
import TodoList from './components/todo/TodoList';
import Layout from './components/layout/Layout';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Layout>
          <TodoList />
        </Layout>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
            duration: 3000,
          }}
        />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;