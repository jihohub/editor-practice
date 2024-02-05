import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArticle } from '../../api/article';
import Loader from '../../components/UI/loader/Loader';
import QuillEditor from '../../components/UI/editor/QuillEditor';
import TinyEditor from '../../components/UI/editor/TinyEditior';
import DraftEditor from '../../components/UI/editor/DraftEditor';

const EditPage = () => {
  const { articleId } = useParams() as { articleId: string };

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['article'],
    queryFn: () => getArticle(Number(articleId)),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Suspense fallback={<Loader />}>
      <div>
        <QuillEditor article={article} />
        <TinyEditor article={article} />
        <DraftEditor article={article} />
      </div>
    </React.Suspense>
  );
};

export default EditPage;
