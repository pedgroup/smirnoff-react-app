import './Column.css'

import PropTypes from 'prop-types';

const Column = ({ size, children }) => {
        const columnClasses = `column col-${size}`;
    
        return (
            <div className={columnClasses}>
                {children}
            </div>
        );
};

Column.propTypes = {
    size: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Column;