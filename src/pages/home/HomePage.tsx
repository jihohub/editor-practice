import React from "react";
import Article from "../../components/UI/article/Article";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../../api/article";
import Loader from "../../components/UI/loader/Loader";

interface ArticleData {
  articleId: number;
  userId: number;
  author: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  likeCount: number;
  isLiked: boolean;
  commentCount: number;
}

const HomePage = () => {
  const {data: articles, isLoading, isError} = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles(),
  });

  if (isLoading) {
    return <Loader />
  }

  return (
    <React.Suspense fallback={<Loader />}>
      <div>
        {articles?.map((article: ArticleData, index: number) => {
          return (
            <Article article={article} key={index} />
          )
        })
        
        }
      </div>
    </React.Suspense>
  )
}

export default HomePage;
