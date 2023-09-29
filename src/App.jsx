/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import './App.css'
import { Button } from './components/Button'

import { StartLogo } from './components/logos/StartLogo'
import { StarLogo } from './components/logos/StarLogo'
import { DrinkWiseLogo } from './components/logos/DrinkWiseLogo'

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

function App() {
  const [city, setCity] = useState()
  const [daytime, setDaytime] = useState()
  const [template, setTemplate] = useState('intro')
  const [regenerateTemplate, setRegenerateTemplate] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sodaCards, setSodaCards] = useState([]);

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
    <div className={'main-container ' + template }>
      <Header />
      { !city && template === 'intro' && 
      <>
        <div className='top-section'>
          <div className='top-section-text'>
            <a href='https://drinkwise.org.au/' target='_blank' rel="noreferrer">
              <DrinkWiseLogo />
            </a>
            <p>Please do not share this content with anyone under the age of 18</p>
          </div>
        </div>
        <div className={ 'choices-card ' + template }>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation 
            Lorem ipsum dm erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl.
          </p>
          <Button 
            updateTemplate={updateTemplate}
            choice='cities'
          >
            <StartLogo />
          </Button>
        </div>
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
      <Spinner />
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
                <button href='#' >
                  Enter to Win
                </button>
                <button className='star' onClick={() => regeneratetemplate()}>
                <StarLogo />
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
      </>
      }
      
    </div>
  )
}

export default App
