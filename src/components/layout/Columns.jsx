import './Columns.css'

import PropTypes from 'prop-types';

const Columns = ({ children }) => {
        return (
            <div className="columns">
                {children}
            </div>
        );
};

Columns.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Columns;