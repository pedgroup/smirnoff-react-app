import PropTypes from 'prop-types';
import Columns from './layout/Columns'
import Column from './layout/Column'


export const SodaCards = ({sodaCardsSuffle}) => {
    
    return (
      <div>
        <Columns>
          {sodaCardsSuffle.map(activity => (
            <Column size='3' key={activity.title}>
              <img width={'100%'} src={activity.image} alt={activity.title} />
            </Column>
          ))}
        </Columns>
      </div>
    );
}

SodaCards.propTypes = {
  sodaCardsSuffle: PropTypes.array.isRequired,
  daytime: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};
