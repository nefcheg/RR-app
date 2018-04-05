import articlesObj from '../json/articles.json'
import _ from 'lodash';

const importArticleList = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(articlesObj);
  }, 1500);
});

export const importArticle = (id) => new Promise((resolve, reject) => {
  const article = _.find(articlesObj,['id', id ]);
  setTimeout(() => {
    resolve(article);
    //reject('oops');
  }, 500);
});

export default importArticleList;