import axios from 'axios';

interface NewArticleData {
  description: string;
}

const getArticles = async () => {
  try {
    const { data } = await axios.get(
      `https://damoinda-dev-firebase-default-rtdb.firebaseio.com/article.json`,
    );
    return data;
  } catch (error) {
    return error;
  }
};

const getArticle = async (articleId: number) => {
  try {
    const { data } = await axios.get(
      `https://damoinda-dev-firebase-default-rtdb.firebaseio.com/article/${articleId}.json`,
    );
    return data;
  } catch (error) {
    return error;
  }
};

const postArticle = async () => {
  try {
    const { data } = await axios.post(
      `https://damoinda-dev-firebase-default-rtdb.firebaseio.com/article.json`,
    );
    return data;
  } catch (error) {
    return error;
  }
};

const patchArticle = async (articleId: number, newContent: NewArticleData) => {
  try {
    const { data } = await axios.patch(
      `https://damoinda-dev-firebase-default-rtdb.firebaseio.com/article/${articleId}.json`,
      newContent,
    );
    return data;
  } catch (error) {
    return error;
  }
};

export { getArticles, getArticle, postArticle, patchArticle };
