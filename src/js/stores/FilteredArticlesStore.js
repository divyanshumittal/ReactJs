      import { EventEmitter } from "events";

      import dispatcher from "../dispatcher";

      class FilteredArticlesStore extends EventEmitter {
        constructor() {
          super();
          this.filteredArticles = [];
          this.categories = [{
              name: 'Crime',
              selected: false
            }, {
              name: 'Comedy',
              selected: false
            }, {
              name: 'Sports',
              selected: false
            }, {
              name: 'Music',
              selected: false
            }, {
              name: 'Movies',
              selected: false
            }, {
              name: 'Fashion',
              selected: false
            }, {
              name: 'Hollywood',
              selected: false
            }, {
              name: 'Technology',
              selected: false
            }, {
              name: 'World',
              selected: false
          }];
        }

        getArticleOfTheDay() {
          return {
            id: Date.now(),
            url: 'http://www.nytimes.com/2016/04/28/fashion/dyson-hair-dryer.html',
            title: `James Dyson, the Steve Jobs of household products, wants to do for beauty and grooming what his company 
            did for vacuum cleaners. Will consumers buy it?`,
            img: 'https://static01.nyt.com/images/2016/04/28/fashion/28DYSON1/28DYSON1-mediumThreeByTwo440-v2.jpg',
            web_url: ''
          };
        }

        getAll() {
          return this.filteredArticles;
        }

        getCategories() {
          return this.categories;
        }

        updateFilteredArticles(data) {
          this.filteredArticles = data;
          this.emit("change");
        }

        handleActions(action) {
          switch(action.type) {
            case "FILTERED_ARTICLES": {
              this.updateFilteredArticles(action.data);
              break;
            }
          }
        }

      }

      const filteredArticlesStore = new FilteredArticlesStore;
      dispatcher.register(filteredArticlesStore.handleActions.bind(filteredArticlesStore));

      export default filteredArticlesStore;
