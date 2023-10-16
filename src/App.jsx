/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import './App.css'
import { Button } from './components/Button'

import { StartLogo } from './components/logos/StartLogo'
import { StarLogo } from './components/logos/StarLogo'
import { SmirnoffPedestrianLogo } from './components/logos/SmirnoffPedestrianLogo'

import { cards } from "./data/cards"

import { SodaCards } from './components/SodaCards'
import { Header} from './components/Header'
import { BackgroundImage } from './components/BackgroundImage'
import { SydneyLogo } from './components/logos/SydneyLogo'
import { AdelaideLogo } from './components/logos/AdelaideLogo'
import { BrisbaneLogo } from './components/logos/BrisbaneLogo'
import { MelbourneLogo } from './components/logos/MelbourneLogo'
import { PerthLogo } from './components/logos/PerthLogo'
import { DayLogo } from './components/logos/DayLogo'
import { NightLogo } from './components/logos/NightLogo'

import Columns from './components/layout/Columns'
import Column from './components/layout/Column'

import { SmirnoffSodaLogo } from './components/logos/SmirnoffSodaLogo'
import { Spinner } from './components/Spinner'
import { ShareModal } from './components/ShareModal'
import { StarLogoNight } from './components/logos/StarLogoNight'
import { EnterLogo } from './components/logos/EnterLogo'
import { DrinkIQLogo } from './components/logos/DrinkIQLogo'

function App() {
  const [city, setCity] = useState()
  const [daytime, setDaytime] = useState()
  const [template, setTemplate] = useState('intro')
  const [regenerateTemplate, setRegenerateTemplate] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sodaCards, setSodaCards] = useState([]);

  // State to manage age verification
  const [verificationAge, setVerificationAge] = useState(true);

  // State to store user input for age verification
  const [birthYear, setBirthYear] = useState('');

  // State to manage the error message
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle age verification
  const handleAgeVerification = () => {
    const currentYear = new Date().getFullYear();
    const userYear = parseInt(birthYear, 10);

    // Check if the user is at least 18 years old and not more than 103 years old
    if (userYear && currentYear - userYear >= 18 && currentYear - userYear <= 103) {
      // Allow user to proceed
      setVerificationAge(false);
    } else {
      // Display an error message
      setErrorMessage('You must be at least 18 years old and not more than 103 years old to proceed.');
    }
  };

  // Calculate whether the "Enter" button should be disabled
  const isEnterButtonDisabled = () => {
    const currentYear = new Date().getFullYear();
    const userYear = parseInt(birthYear, 10);

    // Disable the button if the input is not a valid birth year
    return !(userYear && currentYear - userYear >= 18 && currentYear - userYear <= 103);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateTemplate = (choice) => {
    if (city && daytime) {
      setTemplate('intro') 
    } else if (city) {
      setTemplate('results')
      document.body.classList.add('results');
      setDaytime(choice)
    } else if (template === 'cities') {
      setCity(choice)
      setTemplate('daytime')
    } else {
      setTemplate(choice)
    }
  }

  const regeneratetemplate = () => {
    if (!city || !daytime ) return
    setRegenerateTemplate(!regenerateTemplate)
  }

  // Function to shuffle soda cards and set them in the state
  const shuffleSodaCards = () => {
    if (city && daytime) {
      const cityObject = cards.find((card) => card.city === city);
      const daytimeObject = cityObject[daytime];
      const shuffledCards = daytimeObject
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setSodaCards(shuffledCards);
    }
  };

  useEffect(() => {
    shuffleSodaCards();
  }, [city, daytime, regenerateTemplate]);

  const resetChoices = () => {
    setCity()
    setDaytime()
    setTemplate('intro')
    setRegenerateTemplate(false)
    document.body.classList.remove('results');
    document.body.classList.add('intro');
  }

  return (
    <div className={ city && daytime ? 'main-container ' + template + ' ' + city + ' ' + daytime : 'main-container ' + template }>
      <Header />
      { !city && template === 'intro' && 
      <>
      {/* Age verification section */}
      {verificationAge && (
        <div className="age-verification">
          <div className="age-verification-content">
            <SmirnoffPedestrianLogo />
            <h2>Adventure awaits you</h2>
            <p>Enter your Date of Birth to find out more</p>
            <div className="age-verification-input">
              {/* Input for year only */}
              <input
                className="birth-year"
                type="number"
                placeholder="YYYY"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
              />
              <button
                className="enter-button" 
                onClick={handleAgeVerification} 
                disabled={isEnterButtonDisabled()}
              >
                <EnterLogo />
              </button>
            </div>
            <p>As part of our commitment to responsible drinking:</p>
            <p>
              <a href='https://www.drinkiq.com/' target='_blank'>
                <DrinkIQLogo />
              </a>
            </p>
            <p>
              <a href='https://www.pedestrian.tv/website-terms-of-service/' target='_blank' >
                Conditions of Use Australia
              </a>
            </p>
          </div>
          {/* Display error message if present */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}
        { !verificationAge && (
          <>
            <div className='top-section'></div>
            <div className={ 'choices-card ' + template }>
              <p>
                Stuck on what to do this weekend? We’ve assembled a list of some of the biggest music festivals to the best-hidden gems that you can find in Australia. 
                Whether you’re looking for an activity to fill out a day trip into the city, or you’re looking for a bite to eat at night, we’ve got you covered. 
                Pick day or night, and an activity will be chosen for you inspired by Smirnoff Soda flavours.
              </p>
              <p>
                Enter for your chance to win prizes including festival tickets, Smirnoff bucket hats, Smirnoff Sodas and more! All you have to do is click Enter To Win, fill in the form with your details and tell us in 25 words or less, About The Best Adventure You've Ever Had For A Chance To Win.
              </p>
              <Button updateTemplate={updateTemplate} choice='cities'>
                <StartLogo />
              </Button>
            </div>
          </>
        )}
      </>
      }
      { !city && template==='cities' && 
      <>
        <h2>PICK YOUR CITY</h2>
        <div className={ 'choices-card ' + template }>
          <Button 
            updateTemplate={updateTemplate}
            choice="adelaide"
          >
            <AdelaideLogo />
          </Button>
          <Button
            updateTemplate={updateTemplate}
            choice="brisbane"
          >
            <BrisbaneLogo />
          </Button>
          <Button 
            updateTemplate={updateTemplate}
            choice="melbourne"
          >
            <MelbourneLogo />
          </Button>
          <Button 
            updateTemplate={updateTemplate}
            choice="perth"
          >
            <PerthLogo />
          </Button>
          <Button
            updateTemplate={updateTemplate}
            choice="sydney"
          >
            <SydneyLogo />
          </Button> 
        </div>
      </>
      }
      { city && !daytime && <>
        <h2>Pick Day or Night</h2>
        <section className="columns">
          <div className="column">
          <div className={ 'choices-card ' + template }>
            <Button 
              updateTemplate={updateTemplate}
              choice="day"
            >
              <DayLogo />
            </Button>
        </div>
          </div>
          <div className="column">
          <div className={ 'choices-card ' + template }>
            <Button
              updateTemplate={updateTemplate}
              choice="night"
            >
              <NightLogo />
            </Button> 
        </div>
          </div>
        </section> 
      </>}
      { city && daytime &&
      <>
      <Spinner className={daytime} />
      { daytime === 'day' ? <BackgroundImage src='assets/images/day-dark.png' alt='results top image'/> : <BackgroundImage src='assets/images/night-dark.png' alt='results top image'/>}
      {isModalOpen && <ShareModal showModal={isModalOpen} closeModal={closeModal} />}
      <section className="results-top-section">
        <div className='wrapper'>
        <Columns>
          <Column size='2'>
            <div className="results-top-section-left">
              <h2>a <span className='daytime'>{daytime}</span> in 
                <span className='city'>
                  {city === 'adelaide' ? <AdelaideLogo /> : null}
                  {city === 'brisbane' ? <BrisbaneLogo /> : null}
                  {city === 'melbourne' ? <MelbourneLogo /> : null}
                  {city === 'perth' ? <PerthLogo /> : null}
                  {city === 'sydney' ? <SydneyLogo /> : null}
                </span>
              </h2>
            </div>
          </Column>
          <Column size='2'>
            <div className="results-top-section-right">
              <SmirnoffSodaLogo />
            </div>
          </Column>
        </Columns>
        </div>
      </section>
      <section className="results-middle-section">
        <div className="wrapper">
          <Columns>
            <Column size='1-3'>
              <div className="results-middle-section-left">
                <button onClick={() => resetChoices()}>
                  Start Again
                </button>
                <button onClick={openModal}>
                  Share
                </button>
                <a href='https://pedestriantv1.typeform.com/to/PaV9ew4v' target="_blank" >
                  Enter to Win*
                </a>
                <button className='star' onClick={() => regeneratetemplate()}>
                {daytime === 'day' ? <StarLogo /> : <StarLogoNight />}
                </button>
              </div>
            </Column>
            <Column size='2-3'>
              <div className="results-middle-section-right">
                <SodaCards 
                  sodaCardsSuffle={sodaCards} 
                  daytime={daytime}
                  city={city}
                />
              </div>
            </Column>
          </Columns>
        </div>
      </section>
        <p className="disclaimer">
          Enter for your chance to win prizes including festival tickets, Smirnoff bucket hats, Smirnoff Sodas and more! All you have to do is click Enter To Win, fill in the form with your details and tell us in 25 words or less, About The Best Adventure You've Ever Had For A Chance To Win.
        </p>
      </>
      }
      
    </div>
  )
}

export default App
