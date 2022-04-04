import React from 'react';
import * as axios from "axios";
import { useParams, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from './UI/Button/Button';
import './Home.sass';

function Home(props) {

  const params = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("Search");
  let url;
  const type = params.id ? 'detail' : search ? 'list' : undefined;

  if (params.id) {
    url = `https://ml-challenge-items.herokuapp.com/items/` + params.id;
  } else if (search) {
    url = `https://ml-challenge-items.herokuapp.com/items?q=`+ search;
  }

  return (
    <Search value={url} type={type}/>
  )
}

class Search extends React.Component {
  constructor(props) {
    super(props)   
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    if (this.props.value) {
      axios.get(this.props.value).then(res => {
        this.setState({
            record: res.data.items,
        })
      }).catch(error => console.log(error));
    }
  }

  renderListing() {
    let recordList = [];
    if (this.state.record) {

      this.state.record.map((item, index) => {
          return recordList.push(
          <li key={index}>
            <a className="item" href={'/items/' + item._id}>
              <div className="img-item-wrapper">
                <img className="img-item-list" alt={item.title} src={item.picture}></img>
              </div>
              <div className="item-text">
                <h2>{item.price.currency + ' ' + item.price.amount + ',' + item.price.decimals}</h2>
                <p>{item.title}</p>
              </div>
            </a>
          </li>
        )
      })
      return recordList;
    }
  }

  render() {
    let searchQuery;
    let description, picture, title;
    let price = {
      currency: 'R$',
      amount: 0,
      decimals: 0
    }

    if (this.props.value && this.props.type === 'detail' && this.state.record) {
      description = this.state.record.description
      picture = this.state.record.picture
      price.currency = this.state.record.price.currency
      price.amount = this.state.record.price.amount
      price.decimals = this.state.record.price.decimals
      title = this.state.record.title
    }
    return (
      <div className="home">
        <header className="home-header" role="banner">
          <a id="logo" className="nav-logo" href="//www.mercadolivre.com.br"tabIndex="2"></a>
          <div className="nav-search">
            <form onSubmit={() => '/items?Search=' + searchQuery}>
              <label aria-labelledby=''>
                <input
                  className="nav-search-input"
                  aria-label="Digite o que você quer encontrar"
                  placeholder="Buscar produtos"
                  maxLength="120"
                  tabIndex="2"
                  name="Search"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => searchQuery = event.target.value}
                />
                {searchQuery}
              </label>
              <Button
                className="nav-search-btn"
                type="submit"
              >
                <i role="img" aria-label="Buscar" className="nav-icon-search">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </i>
              </Button>
            </form>
          </div>
        </header>
        <div className="content">
          <div>
            <ul className="list breadcrumb">
              <li><a href="/">breadcrumb</a></li>
            </ul>
          </div>
          <section className="container-response">
            {this.props.value && this.props.type === 'list' &&
              <ol className="list list-response">
                {this.renderListing()}
              </ol>
            }
            {this.props.value && this.props.type === 'detail' &&
              <div className="detail-response-wrapper">
              <div className="detail-response">
                <div className="img-detail-wrapper">
                  <img className="img-detail" alt={title} src={picture}></img>
                </div>
                <div className="detail-main-container">
                  <h1>{title}</h1>
                  <p className="price">{price.currency + ' ' + price.amount + ',' + price.decimals}</p>
                  <Button className="buy-btn" type="button">Comprar</Button>
                </div>
              </div>
              <div className="detail-description-wrapper">
                <h2>Descripción del Producto</h2>
                <p>{description}</p>
              </div>
              </div>
            }
          </section>
        </div>
      </div>
    )
  }
}
  
export default Home;