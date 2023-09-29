import { useState } from 'react'
import PropTypes from 'prop-types';

import './ShareModal.css'
import { CloseLogo } from './logos/closeLogo';
import { FacebookLogo } from './logos/FacebookLogo';
import { TwitterLogo } from './logos/TwitterLogo';
import { MailLogo } from './logos/MailLogo';

export const ShareModal = ( { showModal, closeModal } ) => {
    // State to track the visibility of the modal
    const [visible, setVisible] = useState(showModal);
    // Function to close the modal
    const handleCloseModal = () => {
        setVisible(false);
        closeModal();
      };

    return (
        <div className={`modal ${visible ? 'visible' : ''}`}>
            <div className="modal-content">
                <button type="button" onClick={handleCloseModal} className="btn btn--close" data-ui-dismiss aria-label="Close">
                    <CloseLogo />
                </button>
                <h3>Share</h3>
                <ul className="share-list">
                    <li className="share-list__item">
                        <a className="social-share facebook" href="https://www.facebook.com/sharer/sharer.php?u=#" target="_blank" onClick="return !window.open(this.href, 'Facebook', 'width=640,height=580')" rel="noopener noreferrer">
                            <FacebookLogo />
                        </a>
                    </li>
                    <li className="share-list__item">
                        <a className="social-share twitter" href="https://twitter.com/share?text=#" onClick="return !window.open(this.href, 'sharetwitter', 'width=640,height=580')" target="_blank" rel="noopener noreferrer">
                            <TwitterLogo />
                        </a>
                    </li>
                    <li className="share-list__item">
                        <a className="social-share email" href="mailto:?subject=smifnoff&amp;body=Check out this article" onClick="return !window.open(this.href, 'mail', 'width=640,height=580')" target="_blank" rel="noopener noreferrer">
                            <MailLogo />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

ShareModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};
