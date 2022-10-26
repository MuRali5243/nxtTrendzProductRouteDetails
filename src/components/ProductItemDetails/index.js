import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProducts from '../SimilarProductItem'
import './index.css'

const status = {
  initial: 'initial',
  Loading: 'loading',
  success: 'success',
  failure: 'failure',
}

class ProductDetails extends Component {
  state = {list: [], isLoader: status.initial, count: 1}

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({isLoader: status.Loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const Url = `https://apis.ccbp.in/products/${id}`
    const jwttoken = Cookies.get('jwt_token')
    console.log(jwttoken)
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwttoken}`},
    }

    const response = await fetch(Url, options)
    if (response.ok) {
      const res = await response.json()
      console.log(res)

      const data = {
        availability: res.availability,
        brand: res.brand,
        id: res.id,
        rating: res.rating,
        price: res.price,
        des: res.description,
        url: res.image_url,
        title: res.title,
        reviews: res.total_reviews,
        similar: res.similar_products.map(e => ({
          availability: e.availability,
          brand: e.brand,
          id: e.id,
          rating: e.rating,
          price: e.price,
          des: e.description,
          url: e.image_url,
          title: e.title,
          reviews: e.total_reviews,
          style: e.style,
        })),
      }
      console.log(data)
      this.setState({list: data, isLoader: status.success})
    } else {
      this.setState({isLoader: status.failure})
    }
  }

  Loader = () => (
    <div className="products-loader-cont">
      <Loader type="ThreeDots" color="green" height="50" width="50" />
    </div>
  )

  countIncFunction = () => {
    let {count} = this.state
    count += 1
    this.setState({count})
  }

  countDecFunction = () => {
    const {count} = this.state
    console.log(count)
    if (count !== 1) {
      const countt = count - 1
      this.setState({count: countt})
    }
  }

  renderDetails = () => {
    const {list, count} = this.state
    const {
      similar,
      id,
      rating,
      price,
      reviews,
      brand,
      des,
      url,
      availability,
      title,
    } = list
    return (
      <div className="pro-details-main-cont">
        <div className="pro-details-cont">
          <img className="pro-main-image" src={url} alt="product" />
          <div className="pro-main-image-desc">
            <h1>{title}</h1>
            <p>{`Rs ${price}/-`}</p>
            <div className="rat-review-cont">
              <div className="rat-cont">
                <p>{rating}</p>
                <img
                  className="star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p>{`${reviews} Reviews`}</p>
            </div>
            <p>{des}</p>
            <p>{availability}</p>
            <p>{brand}</p>
            <br />
            <hr />
            <div className="add-sub-cont">
              <button testid="minus" onClick={this.countDecFunction}>
                -
              </button>
              <p>{count}</p>

              <button testid="plus" onClick={this.countIncFunction}>
                +
              </button>
            </div>
            <button className="addtocartBtn">ADD TO CART</button>
          </div>
        </div>
        <ul className="simliar-list-cont">
          {similar.map(each => (
            <SimilarProducts data={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  failureFun = () => (
    <div className="fail-cont">
      <img
        className="error-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
      />
      <h1>Product Not Found</h1>
      <Link to="/products/">
        <button className="cont-shop-btn">Continue Shopping</button>
      </Link>
    </div>
  )

  testFunct = () => {
    const {isLoader} = this.state
    switch (isLoader) {
      case status.Loading:
        return this.Loader()
      case status.success:
        return this.renderDetails()
      case status.failure:
        return this.failureFun()

      default:
        return null
    }
  }

  render() {
    const {isLoader} = this.state
    return (
      <div>
        <Header />
        {this.testFunct()}
      </div>
    )
  }
}

export default ProductDetails
