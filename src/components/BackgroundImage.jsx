import PropTypes from 'prop-types';
import './BackgroundImage.css';

export const BackgroundImage = ({ src, alt }) => {
    return (
        <div className="background-image">
            <img src={src} alt={alt} />
        </div>
    );
};

BackgroundImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};