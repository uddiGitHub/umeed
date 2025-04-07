import React from 'react'
import styles from './Aboutus.module.css'
import ownerImg from '../../assets/people/SagarikaGhibliInk.png'
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
function Aboutus() {
  return (
    <>
      <div className={styles.aboutusContainer}>
        <div className={styles.ownerContainer}>
          <div className={styles.ownerImg}>
            <img src={ownerImg} alt="Sagarika Deka" />
          </div>
          <div className={styles.ownerContactLinksContainer}>
            <a href=""><FaInstagram /></a>
            <a href=""><FaLinkedin /></a>
            <a href=""><FaXTwitter /></a>
          </div>
        </div>
        <div className={styles.aboutusHeaderText}>
          <h1>About Us</h1>
          <p>We're an intersectional feminist organization that uses art and storytelling based interventions to talk about gender-based violence and social justice. </p>
          <button> Have a look at our work </button>
        </div>
      </div>
      {/* Our Story */}
      <div className={styles.storyContainer}>
        <div className={styles.story}>
          <h1>Our Story So Far</h1>
          <p>Friends of Toto was born from a deeply personal journey. It started when Pragya, a victim-survivor of sexual assault and passionate advocate for gender justice, realized that her own story could be a source of strength for others. She wanted to ensure that no one else would feel alone in their experiences. Pragya is the voice behind Toto!</p>
        </div>
      </div>
      {/* Media and awards */}
      <div className={styles.MediaAndAwardContainer}>
        <div className={styles.MediaAndAwards}>
        <h1>In Media!</h1>
        <p>1 - GirlUp Champion of Change Award 2023 :

          For the work done to address gender-based violence by Friends of Toto (FOT Foundation), Pragya Sikka - founder/director received the 'GirlUp Champion of Change Award' in the category 'The Future is Safe.' Girl Up is a UN Foundation initiative - a global network of girls and women across 155 countries.
          This award was presented to her by Dia Mirza, actor, filmmaker, and UNEP Goodwill Ambassador, and Shompi Sharp, United Nations Resident Coordinator India at Girl Up’s first-ever Leadership Summit in India.</p>
        </div>
      </div>

      {/* <div className={styles.galeryContainer}>

        </div> */}
    </>
  )
}

export default Aboutus