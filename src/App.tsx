import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from "../src/pages/home/HomePage";
import ArticlePage from "../src/pages/article/ArticlePage";
import PostPage from "../src/pages/post/PostPage";
import EditPage from "../src/pages/edit/EditPage";
import './App.css'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:articleId" element={<ArticlePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/article/:articleId/edit" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
