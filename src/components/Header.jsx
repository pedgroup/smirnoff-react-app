import { PedestrianLogo } from "./logos/PedestrianLogo"

import './Header.css'

export const Header = () => {
    return (
        <div className="header">
            <a href="https://www.pedestrian.tv/" rel="noreferrer">
                <PedestrianLogo />
            </a>
        </div>
    )
}