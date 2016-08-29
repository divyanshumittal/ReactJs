import React from "react";

export default class FilteredArticle extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { title, img, url } = this.props;

    var imgClass = {
      height: 200,
      width: 250
    };

    var padding5 = {
      padding: 5
    };

    var backgroundGrey = {
      backgroundColor : "lightgrey",
      borderWidth: 2
    };

    return (
     <div className="panel" style={backgroundGrey}>
       <div class="row" style={padding5}>
         <div class="col-xs-4">
            <img style={imgClass} src={img}/>
        </div>
        <a target="_blank" href={url} class="col-xs-8">
          <div>
            <h4><span className="break-word">{title}</span></h4>
          </div>
        </a>
       </div>
      </div>
    );
  }
}
