import './index.css'

const SimiliarItem = props => {
  const {data} = props
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
    style,
  } = data
  return (
    <ul className="simi-item">
      <img className="sim-image" src={url} alt="similar product" />
      <p>{title}</p>
      <p>{brand}</p>
      <div className="simi-price-cont">
        <p>{`Rs ${price}/-`}</p>
        <div className="rat-cont">
          <p>{rating}</p>
          <img
            className="star"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </ul>
  )
}
export default SimiliarItem
