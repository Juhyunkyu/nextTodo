import React from "react";
import { TodoProvider } from "./contexts/TodoContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/layout/Layout";
import TodoList from "./components/todo/TodoList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Layout>
          <TodoList />
        </Layout>
        <Toaster position="bottom-right" />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
