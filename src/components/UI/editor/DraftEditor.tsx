import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchArticle } from '../../../api/article';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftjsToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

const DraftEditor: React.FC<ArticleProps> = ({ article }) => {
  const { articleId } = useParams() as { articleId: string };
  const navigate = useNavigate();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState('');

  const updateTextDescription = async state => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
  };

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(article.description);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, []);

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
      newContent: { description: htmlString },
    });
  };

  return (
    <div>
      <h1>This is React-Draft-Wysiwyg Editor</h1>
      <form onSubmit={handleSubmit}>
        <Editor
          editorState={editorState}
          onEditorStateChange={updateTextDescription}
          localization={{ locale: 'ko' }}
          editorStyle={{
            height: '400px',
            width: '100%',
            border: '3px solid lightgray',
            padding: '20px',
          }}
        />
        <button type="submit">수정완료</button>
      </form>
    </div>
  );
};

export default DraftEditor;
