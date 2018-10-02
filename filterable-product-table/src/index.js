import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText : "",
      isStockedOnly : false
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleIsStockedOnly = this.handleIsStockedOnly.bind(this);
  }

  handleSearchTextChange(text) {
    this.setState({
      searchText : text
    });
  }

  handleIsStockedOnly(checked) {
    this.setState({
      isStockedOnly : checked
    });
  }

  render() {
    return (
      <div>
        <SearchDiv 
          searchText={this.state.searchText}
          isStockedOnly={this.state.isStockedOnly}
          onSearchTextChange={this.handleSearchTextChange}
          onIsStockedOnlyChange={this.handleIsStockedOnly}
        />
        <ProductsTable 
          searchText={this.state.searchText}
          isStockedOnly={this.state.isStockedOnly}
          products={PRODUCTS}
        />
      </div>
    );
  }
}

class SearchDiv extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleIsStockedOnly = this.handleIsStockedOnly.bind(this);
  }

  handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
  }

  handleIsStockedOnly(e) {
    this.props.onIsStockedOnlyChange(e.target.checked);
  }
  render() {
    return (
      <form>
        <input 
          type="text"
          value={this.props.searchText}
          onChange={this.handleSearchTextChange}
        />
        <p>
          <input 
            type="checkbox"
            checked={this.props.isStockedOnly}
            onChange={this.handleIsStockedOnly}
          />
          {' '}
          Only show stocked products
        </p>
      </form>
    )
  }
}

class ProductsTable extends React.Component {

  render() {
    const searchText = this.props.searchText;
    const isStockedOnly = this.props.isStockedOnly;
    const products = this.props.products;

    let lastCategory = null;
    let rows = []
    products.forEach((product) => {
      if(product.name.indexOf(searchText) === -1) {
        return;
      }
      if(isStockedOnly && !product.stocked) {
        return;
      }
      if(product.category !== lastCategory) {
        rows.push(
          <CategoryRow category={product.category} key={product.category} />
        )
      }
      rows.push(
        <Product product={product} key={product.name} />
      )
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

class CategoryRow extends React.Component {
  render() {
    return (
        <tr>
          <th colSpan="2">
            {this.props.category}
          </th> 
        </tr>
    )
  }
}

class Product extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? product.name : (
      <span style={{color:"red"}}>
        {product.name}
      </span>
    );
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
  }
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(<FilterableProductTable products = {PRODUCTS} />, document.getElementById('root'));
registerServiceWorker();