import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import '../../css/App.css'

import * as articleListActions from '../actions/ArticleListActions'

import ArticleList from '../components/ArticleList'
import TagList from '../components/TagList'
import LiveSearch from '../components/LiveSearch'
import Preloader from '../components/Preloader'
import ErrorMessage from '../components/ErrorMessage'


export class ArticlesListPage extends Component {
  actions = this.props.articleListActions;

  //получение полного списка тегов
  getAllTags = (data) => {
    return _.uniq([].concat(...(_.map(data, 'tags'))));
  };

  //Получение списка отфильтрованных статей
  getFilteredArticles = (tag, string) => {
    if (tag === null && string === "")  {
      return this.props.dataObject;
    }

    const lowerString = string.toLowerCase();


    if (tag === null) return this.props.dataObject.filter((current) => {
      return current.title.toLowerCase().indexOf(lowerString) !== -1
    });

    return this.props.dataObject.filter((current) => {
      return (current.tags.includes(tag) && (current.title.toLowerCase().indexOf(lowerString) !== -1));
    });
  };

  //выбор активного тега
  tagClick = (tag) => () => {
    this.actions.setTag(tag);
  };

  //livesearch
  inputChange = (e) => {
    this.actions.setLivesearch(e.target.value);
  };

  //загрузка данных
  componentWillMount() {
    if (this.props.dataObject.length === 0) {
      this.actions.getData().then(() => {
        this.actions.getTagList(this.getAllTags(this.props.dataObject))
      });
    }
  };

  //------------------------------------------------

  getPageJSX = () => {
    return (
      <div className="container">
        <LiveSearch dataChange={this.inputChange} dataValue={this.props.liveSearchString} />
        <TagList dataTagList={this.props.tagList} dataSetTag={this.tagClick} dataActiveTag={this.props.currentTag} isOuter={true}/>
        <ArticleList data={this.getFilteredArticles(this.props.currentTag, this.props.liveSearchString)} dataActiveTag={this.props.currentTag} dataClick={this.tagClick}/>
      </div>
    )
  };

  render() {

    return (
        <div className="App">
          { this.props.isWaiting && <Preloader /> }
          { this.props.error && <ErrorMessage /> }
          { !this.props.isWaiting && this.getPageJSX() }
        </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    currentTag: state.articleList.currentTag,
    liveSearchString: state.articleList.liveSearchString,
    dataObject: state.articleList.dataObject,
    filteredData: state.articleList.filteredData,
    isWaiting: state.articleList.isWaiting,
    tagList: state.articleList.tagList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    articleListActions: bindActionCreators(articleListActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesListPage);


