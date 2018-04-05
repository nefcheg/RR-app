import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import _ from 'lodash';

import '../../css/App.css';

import * as articleItemActions from "../actions/ArticleItemActions";

import Preloader from '../components/Preloader'
import ErrorMessage from '../components/ErrorMessage'


class ArticlePage extends Component {

  articleId = +this.props.match.params.id;
  actions = this.props.articleItemActions;

  componentWillMount() {
    if (_.isEmpty(this.props.currentArticle) || !(this.props.currentArticle === this.articleId)) {
      this.actions.getArticle(this.articleId);
    }
  };

  getPageJSX = () => {
    return (
      <div className="container">
        <h1>{this.props.currentArticle.title}</h1>
        <p>{this.props.currentArticle.description}</p>
      </div>
    )
  };

  render() {
    console.log(this.props);
    return (
      <div>
        { (this.props.isWaiting) && <Preloader /> }
        { (this.props.error) && <ErrorMessage /> }
        { (!this.props.isWaiting) && (!this.props.error) && this.getPageJSX() }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    currentArticle: state.articleItem.currentArticle,
    isWaiting: state.articleItem.isWaiting,
    error: state.articleItem.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    articleItemActions: bindActionCreators(articleItemActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
