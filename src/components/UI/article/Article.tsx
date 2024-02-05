import { useNavigate } from 'react-router-dom';
import '../../../css/article.css';
import moment from 'moment';
import 'moment/dist/locale/ko';
import DOMPurify from 'dompurify';
// import { ReactComponent as LikeIcon } from "../assets/img/mainTitle.svg";
// import { ReactComponent as MainTitle } from "../assets/img/mainTitle.svg";
import LikeFillIcon from '../../../assets/likeFill.svg';
import LikeIcon from '../../../assets/like.svg';

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

const Article: React.FC<ArticleProps> = ({ article }) => {
  const navigate = useNavigate();
  const isArticlePage = window.location.pathname !== '/';

  const handleNavigate = () => {
    if (!isArticlePage) {
      navigate(`/article/${article.articleId}`);
    }
  };

  return (
    <div className="article-container" onClick={handleNavigate}>
      <div className="article-user-div">
        <img src={article.imageUrl} alt="user profile" className="article-user-img"></img>
        <p className="article-user-name">{article.author}</p>
      </div>
      <div className="article-image-div">
        <img
          src={article.imageUrl}
          alt="content image"
          className="article-image-img"
        ></img>
      </div>
      <div className="article-like-div">
        {article.isLiked ? (
          <img src={LikeFillIcon} className="article-like-icon" alt="liked" />
        ) : (
          <img src={LikeIcon} className="article-like-icon" alt="not liked yet" />
        )}
        <p className="article-like-count">{article.likeCount}</p>
      </div>
      <div className="article-control-div">
        {isArticlePage && (
          <button
            className="article-control-button"
            onClick={() => navigate(`/article/${article.articleId}/edit`)}
          >
            수정
          </button>
        )}
      </div>
      <div className="article-content-div">
        <div className="article-content-title-div">
          <p className="article-content-text">제목</p>
          <p className="article-content-title">{article.title}</p>
        </div>
        <div className="article-content-description-div">
          <p className="article-content-text">내용</p>
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article?.description) }}
          />
        </div>
      </div>
      <div className="article-comment-div">
        {article.commentCount ? (
          <p className="article-comment-count">{`댓글 ${article.commentCount}개 보기`}</p>
        ) : (
          <></>
        )}
      </div>
      <div className="article-createdtime-div">
        <p className="article-createdtime-text">{moment(article.createdAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default Article;
