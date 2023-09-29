import './Spinner.css'

import { useState } from 'react'
import { useEffect } from 'react'

export const Spinner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const spinnerTimeout = setTimeout(() => {
      setVisible(false);
    }, 1000);

    return () => {
      clearTimeout(spinnerTimeout);
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className={`spinner ${visible ? 'visible' : ''}`}>
      <div className="spinner-wrapper">
        <img src="assets/images/spinner.gif" alt="spinner" />
        <div id="loading"></div>
      </div>
    </div>
  )
}
