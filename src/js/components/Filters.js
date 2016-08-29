import React from "react";
import FilteredArticlesStore from "../stores/FilteredArticlesStore";

export default class Filters extends React.Component {
  constructor(props) {
    super();
    this.state = {
      readingTime: 10
    };
  }

  categoryChanged(category) {
    this.props.updateFilters(category.name, document.getElementById(category.name).checked);
  }

  readingTimeChanged() {
    this.state.readingTime = document.getElementById("timeSelector").value;
  }

  render() {
    var filterHeading = {
      fontWeight: 600,
      padding: "10px 0"
    };

    var marginRight10 = {
      marginRight: 10
    };

    var paddingLeft10 = {
      paddingLeft: 10
    };

    var borderStyle = {
      borderLeftStyle: "solid",
      borderColor: "#2196F3",
      backgroundColor: "#ddffff",
      paddingLeft: 10
    };

    var normalFont = {
      fontWeight: "normal"
    };

    var {categories} = this.props;
    const categoriesComponent = categories.map((category) => {
      return  <div key={category.name}>
                <label style={normalFont} for={category.name}>
                  <input style={marginRight10} checked={category.selected} type="checkbox" id={category.name} onChange={this.categoryChanged.bind(this, category)}/>
                  {category.name}
                </label>
              </div>;
    });

    return (
      <div style={borderStyle}>
        <strong>Filters:</strong>
        <div style={filterHeading}>Category</div>
        <div style={paddingLeft10}>
          {categoriesComponent}
        </div>
        <div>
          <div style={filterHeading}>Select Reading time:</div>
          <div> {this.state.readingTime} mins</div>
          <div>
            <input id="timeSelector" type="range" min="0" max="30" value={this.state.readingTime} onChange={this.readingTimeChanged.bind(this)} />
            <div class="row">
              <div class="col col-xs-1">0</div>
              <div class="col col-xs-offset-10 col-1 align-right">30</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
