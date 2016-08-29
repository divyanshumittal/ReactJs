import dispatcher from "../dispatcher";

var $ = require("jquery");

export function updateCategory(selectedCategories) {
  if (_.isEmpty(selectedCategories)) {
    dispatcher.dispatch({
        type: "FILTERED_ARTICLES",
        data: [],
      });
  } else {
    this.getArticles(selectedCategories);
  }
}

export function getArticles(selectedCategories) {
	var nyTimesApiKey = 'db47e890b8494f4cb0e532e6af3dc79f';

	$.ajax({
      url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
      data: {
      	search: 'api-key=' + nyTimesApiKey + '&q=' + selectedCategories
      },
      dataType: 'json'
    }).done(function(res) {
    	var data = res.response.docs;
  		
      // clean data
      var cleanData = [];
      _.forEach(data, function(article) {
        var articleObj = {};
        articleObj.id = article['_id'];
        articleObj.url = article.url || article['web_url'];
        articleObj.title = article.snippet || article['lead_paragraph'];
        articleObj.img = article.img || 'https://static01.nyt.com/' + _.get(article, ['multimedia', '1', 'url']);
        cleanData.push(articleObj);
      });

      console.log('success', cleanData);

  		dispatcher.dispatch({
  	    type: "FILTERED_ARTICLES",
  	    data: cleanData,
  	  });
    }).fail(function(error) {
    	console.log('error getting articles', error);
    });
}