import PropTypes from 'prop-types';
import Columns from './layout/Columns'
import Column from './layout/Column'


export const SodaCards = ({sodaCardsSuffle}) => {
    
    return (
      <div>
        <Columns>
          {sodaCardsSuffle.map(activity => (
            <Column size='3' key={activity.title}>
              <a href='https://urldefense.com/v3/__https:/shop-au-smirnoff.com/au/smirnoff/22501__;!!OK3MsjU!0Lk1PUX2mWwMlh0tRS_Vl9IIyg1p0zLTa3xrQWdMKLB21gvuDquD1t8a5f68oBXak-VvzYHEs-5Qb_Y_xe3hA_rvxQw$' target='_blank' rel='noreferrer'>
                <img width={'100%'} src={activity.image} alt={activity.title} />
              </a>
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
