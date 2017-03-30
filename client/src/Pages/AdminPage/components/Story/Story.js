import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import moment from 'moment'

const Story = ({ story }) => {
  const { _id, title, image, postedBy, created_at } = story;
  const time = moment(created_at, "YYYY-MM-DD").format('LL');
  return (
    <div className="col-md-4">
      <div className="thumbnail">
        <img src={image} alt="Campfire Story" />
        <div className="caption no-border-bottom card-title">
          <h4>{title}
            <Link to={`/edit/${_id}`} className="pull-right card-buttons">
              <span className="glyphicon glyphicon-eye-open"></span>
            </Link>
          </h4>
          <p className="card-info">
            Posted on {time} by {`${postedBy.firstName} ${postedBy.lastName}`}
          </p>
        </div>
      </div>
    </div>
  );
};

Story.propTypes = {
  story: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    postedBy: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Story;