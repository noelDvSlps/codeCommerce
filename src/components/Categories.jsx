import React from "react";
import "./Categories.css"

class Categories extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }
  handleCategoryClick = (e) =>{
    const categories = document.getElementsByName("categoryList");
    //console.log(categories.length); // displays "INPUT"
    for(let i=0; i < 6; i++){
     categories[i].classList.remove('active')
      
    }
  
    this.props.refreshCategory(e.target.textContent);
    e.target.classList.add('active');
  }
  render() {
    
    const categories = ["All Products", "Appliances", "Phones", "Apparels", "Food", "Health"]
    return (
        <>
        
        <h2 style={{textAlign: "left"}}>Categories Menu</h2>
        <ul className="categories">
        {categories.map((category) =>(
          <li 
          id = {category}
          name = {"categoryList"}
          key = {category}
          className=  {category !== "All Products" ? "categories-list" : "categories-list active"}  
          onClick={this.handleCategoryClick}
          value={category}
          >{category}</li>
          ))
  
          }
          <li key = "searchBar" style={{color: "white", marginLeft: "auto"}}
          className="categories-list">
            <label htmlFor="">Search <input type="text"
             onClick={this.props.updateSearchText}
             onChange={this.props.updateSearchText}
             //onBlur = {this.props.ignoreSearch}
             /></label>
          </li>
      </ul>
        </>
    );
  }
}

export default Categories;
