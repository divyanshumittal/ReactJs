import React from "react";

export default class TagsTemplate extends React.Component {
  constructor(props) {
    super();
  }

  deleteCategory(category) {
    var updateFilters = this.props;

    this.props.updateFilters(category, false);
  }

  render() {
    var {selectedCategories} = this.props;
    var cursorPointer = {
      cursor: "pointer"
    }
    var tagsContainer = {
      padding: "15px"
    };
    var tagsInline = {
      display: "inline-block"
    };
    var tagStyle = {
      padding: "2px 5px",
      wordBreak: "break-all",
      border: "solid 1px",
      borderColor: "cadetblue",
      marginRight: "5px"
    };
    var paddingRight = {
      paddingRight: 3
    };

    const TagsComponents = selectedCategories.map((category) => {
        return  <span style={tagStyle} key={category}>
                    <strong><span class="text-primary" style={paddingRight}>{category}</span></strong>
                    <span><i onClick={this.deleteCategory.bind(this, category)} style={cursorPointer} class="fa fa-times-circle"></i></span>
                </span>;
    });
   
    return (
      <div>
        <strong>Category(s) selected: </strong>
        {(function(selectedCategories) {
          if (!selectedCategories.length) {
            return (<span>None</span>); 
          } 
        })(this.props.selectedCategories)} 
        <div class="row">
          <div style={tagsContainer}>
            <div style={tagsInline}>
                {TagsComponents}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
