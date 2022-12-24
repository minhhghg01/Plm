import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const CardComponent = ({ id, name, productLine, imageUrl }) => {
  const navigate = useNavigate();
  return (
    <div
      className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
      onClick={() => {
        navigate("/productDetail");
      }}
    >
      <Card>
        <Card.Img variant="top" src={imageUrl} alt={id} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{productLine}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  productLine: PropTypes.string.isRequired,
  // imageUrl: PropTypes.string.isRequired,
};

export default CardComponent;