import React from "react";
import Filters from "../components/Filters"
import FilteredArticle from "../components/FilteredArticle"
import FilteredArticlesStore from "../stores/FilteredArticlesStore";
import TagsTemplate from "../components/TagsTemplate";
import * as FilterActions from "../actions/FilterActions.js";

export default class Featured extends React.Component {
  constructor() {
    super();
    this.getAll = this.getAll.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.state = {
      articleofTheDay: FilteredArticlesStore.getArticleOfTheDay(),
      selectedCategories: [],
      filteredArticles: FilteredArticlesStore.getAll(),
      categories: FilteredArticlesStore.getCategories()
    };
  }

  componentWillMount() {
    FilteredArticlesStore.on("change", this.getAll);
  }

  componentWillUnmount() {
    FilteredArticlesStore.removeListener("change", this.getAll);
  }

  getAll() {
    this.setState({
      filteredArticles: FilteredArticlesStore.getAll(),
    });
  }

  updateFilters(category, isAdded) {
    var selectedCategories = this.state.selectedCategories;
    var categories = this.state.categories;

    isAdded ? selectedCategories.push(category) : selectedCategories.splice(selectedCategories.indexOf(category), 1);

    _.forEach(categories, function(cat) {
        if (cat.name === category) {
          cat.selected = isAdded
        }
      });

    this.setState({
      categories: categories,
      selectedCategories: selectedCategories
    });

    FilterActions.updateCategory(_.join(selectedCategories));
  }

  render() {

    var {articleofTheDay} = this.state;

    const { filteredArticles } = this.state;

    const filteredArticlesComponents = filteredArticles.map((filteredArticle) => {
        return <FilteredArticle key={filteredArticle.id} {...filteredArticle}/>;
    });

    return (
      <div class="row">
        <div class="col-sm-2">
          <Filters updateFilters = {this.updateFilters}
                   categories={this.state.categories}/>
        </div>
        <div class="col-sm-10">
          <h4>Article of the day</h4>
          <FilteredArticle key={articleofTheDay.id} {...articleofTheDay}/>
          <h4> Relevant articles</h4>
          <TagsTemplate selectedCategories={this.state.selectedCategories} updateFilters = {this.updateFilters}/>
          <ul>{filteredArticlesComponents}</ul>
        </div>
      </div>
    );
  }
}
