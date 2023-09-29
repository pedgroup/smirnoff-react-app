import './Button.css'
import PropTypes from 'prop-types';
export const Button = ({ children, updateTemplate, choice }) => {
        const onClick = () => {
                updateTemplate(choice)
        }
    return (
        <button onClick={onClick}>
            {children}
        </button>
    )
}
Button.propTypes = {
    children: PropTypes.node.isRequired,
    updateTemplate: PropTypes.func.isRequired,
    choice: PropTypes.string.isRequired
};
