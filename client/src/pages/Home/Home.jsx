import React, { useState, useEffect } from 'react'
import styles from './Home.module.css'
import bannerImg from '../../assets/bannerImg1.png'
import art from '../../assets/art.png'
import gay from '../../assets/gay.png'
import logo from '../../assets/logo-transparent-copy.png'
import people from '../../assets/people/people.png'

const Counter = ({ end }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const increment = Math.ceil(end / (4000 / 50))
    let start = 0

    const timer = setInterval(() => {
      start += increment
      start >= end ? (clearInterval(timer), setCount(end)) : setCount(start)
    }, 50)

    return () => clearInterval(timer)
  }, [end])

  return <>{count}</>
}
const commentsData = [
  {
    img: people,
    name: "Sarah Johnson",
    bio: "Artist & Activist",
    comment: "Umeed's workshops transformed how I view art's role in social change. The inclusive environment fosters genuine creativity and dialogue."
  },
  {
    img: people,
    name: "Raj Patel",
    bio: "Community Leader",
    comment: "The baithak initiative has brought our neighborhood together in ways I never imagined. Truly groundbreaking approach to community engagement!"
  },
  {
    img: people,
    name: "Aisha Khan",
    bio: "Educator",
    comment: "Their intersection of technology and social justice education is revolutionary. Our students have found new ways to express their ideas."
  },
  {
    img: people,
    name: "Sarah Johnson",
    bio: "Artist & Activist",
    comment: "Umeed's workshops transformed how I view art's role in social change. The inclusive environment fosters genuine creativity and dialogue."
  },
  {
    img: '#',
    name: "Raj Patel",
    bio: "Community Leader",
    comment: "The baithak initiative has brought our neighborhood together in ways I never imagined. Truly groundbreaking approach to community engagement!"
  },
  {
    img: '#',
    name: "Aisha Khan",
    bio: "Educator",
    comment: "Their intersection of technology and social justice education is revolutionary. Our students have found new ways to express their ideas."
  },
  {
    img: '#',
    name: "Sarah Johnson",
    bio: "Artist & Activist",
    comment: "Umeed's workshops transformed how I view art's role in social change. The inclusive environment fosters genuine creativity and dialogue."
  },
  {
    img: '#',
    name: "Raj Patel",
    bio: "Community Leader",
    comment: "The baithak initiative has brought our neighborhood together in ways I never imagined. Truly groundbreaking approach to community engagement!"
  },
  {
    img: '#',
    name: "Aisha Khan",
    bio: "Educator",
    comment: "Their intersection of technology and social justice education is revolutionary. Our students have found new ways to express their ideas."
  },
]

const Home = () => {
  const impactStats = [
    { end: 1000, text: 'Workshops facilitated on social change' },
    { end: 200, text: 'Events' },
    { end: 5000, text: 'People Impacted' },
    { end: 50, text: 'Collaborations' }
  ]

  const verticalsContent = [
    {
      title: 'Art For Social Change - Baithaks',
      text: 'Host free-to-access monthly workshops on social justice...',
    },
    { title: 'Technology', text: 'We use technology to create social change.' },
    { title: 'Community', text: 'We build communities to create social change.' },
    { title: 'Education', text: 'We use education to create social change.' }
  ]
  const sectionBlocks = [
    { imgFirst: true },
    { imgFirst: false }
  ]

  return (
    <>
      {/* Banner Section */}
      <div className={styles.bannerContainer}>
        <img className={styles.bannerImg} src={bannerImg} alt="Banner" />
        <div className={styles.bannerHeader}>
          <h1>Art For Social Change - Baithaks</h1>
        </div>
      </div>

      {/* Impact Section */}
      <div className={styles.impactContainer}>
        <h1>Impact</h1>
        <p className={styles.impactDescribtion}>
          We have been able to create a positive impact in the community through our events and initiatives.
        </p>
        {impactStats.map((stat, index) => (
          <div key={index} className={styles.impactCard}>
            <h2><Counter end={stat.end} />+</h2>
            <p>{stat.text}</p>
          </div>
        ))}
      </div>


      {/* Colored Section */}
      <div className={styles.coloredSection}>
        {sectionBlocks.map((block, index) => (
          <div key={index} className={styles.coloredSectionBlock}>
            {block.imgFirst ? (
              <>
                <img className={styles.coloredSectionImg} src={gay} alt="Vision" />
                <div className={styles.coloredSectionText}>
                  <h1>Vision</h1>
                  <p>We envision an inclusive and just world where all individuals...</p>
                </div>
              </>
            ) : (
              <>
                <div className={styles.coloredSectionText}>
                  <h1>Vision</h1>
                  <p>We envision an inclusive and just world where all individuals...</p>
                </div>
                <img className={styles.coloredSectionImg} src={gay} alt="Vision" />
              </>
            )}
          </div>
        ))}
      </div>


      {/* Verticals Section */}
      <div className={styles.verticals}>
        <h1>Our Verticals</h1>
      </div>
      <div className={styles.verticalsContainer}>
        {verticalsContent.map((vertical, index) => (
          <div key={index} className={styles.verticalCard}>
            <img className={styles.verticalCardImg} src={art} alt={vertical.title} />
            <h2>{vertical.title}</h2>
            <p>{vertical.text}</p>
          </div>
        ))}
      </div>
      
      {/* Get Involved Section */}
      <div className={styles.getInvolved}>
        <div className={styles.getInvolvedContainer}>
          <div className={styles.getInvolvedText}>
            <h1>Be a Momo to Our Toto?</h1>
            <p>Join us in our mission to challenge societal norms, break the silence on gender-based violence, and create a more equitable future for all. Get involved in our campaigns, come to our events, or support us however, you can, every bit counts.</p>
            <button> Get Involved </button>
          </div>
          <div className={styles.getInvolvedImgContainer}>
            <img className={styles.getInvolvedImg} src={gay} alt="gay" />
          </div>
        </div>
      </div>
      

      <div className={styles.peopleSection}>
        {/* Peoples View Section */}
        <div className={styles.peoplesView}>
          <div className={styles.peoplesViewText}>
            {['Hear', 'what', 'people', 'think', 'about'].map((word, index) => (
              <h1 key={index}>{word}</h1>
            ))}
            <img className={styles.logo} src={logo} alt="umeedLogo" />
          </div>
        </div>

        {/* Peoples Comment Section */}
        <div className={styles.peoplesViewComments}>
          <div className={styles.commentsContainer}>
            {commentsData.map((comment, index) => (
              <div key={index} className={styles.commentBox}>
                <div className={styles.profile}>
                  <img src={comment.img} alt={comment.name} />
                  <div className={styles.profileDescription}>
                    <h1>{comment.name}</h1>
                    <p>{comment.bio}</p>
                  </div>
                </div>
                <div className={styles.comment}>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Home