import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Article from "../../components/UI/article/Article";
import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../../api/article";
import Loader from "../../components/UI/loader/Loader";

const ArticlePage = () => {
  const { articleId } = useParams() as { articleId: string };
  const navigate = useNavigate();
  const {data: article, isLoading, isError} = useQuery({
    queryKey: ['article'],
    queryFn: () => getArticle(Number(articleId)),
  });

  if (isLoading) {
    return <Loader />
  }

  return (
    <React.Suspense fallback={<Loader />}>
      <Article article={article} />
      <button onClick={() => navigate('/')}>메인 페이지로 이동</button>
    </React.Suspense>
  )
}

export default ArticlePage;
