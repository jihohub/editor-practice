import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchArticle } from "../../../api/article";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

interface ArticleProps {
  article: ArticleData;
}

interface NewArticleData {
  description: string;
}

const QuillEditor: React.FC<ArticleProps> = ({article}) => {
  const { articleId } = useParams() as { articleId: string };
  const navigate = useNavigate();
  const [description, setDescription] = useState(article.description);

  const queryClient = useQueryClient();
  const patchMutation = useMutation({
    mutationFn: ({
      articleId: targetArticleId,
      newContent,
    }: {
      articleId: number;
      newContent: NewArticleData;
    }) => patchArticle(targetArticleId, newContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryItem'] });
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
      alert('내 작품 수정이 완료되었습니다.');
      navigate(`/article/${articleId}`);
    },
    onError: () => {
      alert('내 작품 수정에 실패했습니다.');
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    patchMutation.mutate({
      articleId: Number(articleId),
      newContent: { description },
    });
  }


  return (
    <div>
      <h1>This is React-Quill Editor</h1>
      <form onSubmit={handleSubmit}>
        <ReactQuill theme="snow" value={description} onChange={setDescription} />
        <button type="submit">수정완료</button>
      </form>
    </div>
  )
}

export default QuillEditor;
