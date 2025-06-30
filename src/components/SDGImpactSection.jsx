import React from 'react';
import Image from 'next/image';
import styles from './SDGImpactSection.module.css';

const SDGImpactCard = ({ badge, image, title, number, description }) => (
  <div className={styles.impactCard}>
    <span className={styles.sdgBadge}>{badge}</span>
    <h2>{title}</h2>
    <div className={styles.profileWrapper}>
      <Image
        src={image}
        alt={title}
        width={180}
        height={180}
        className={styles.profilePic}
      />
    </div>
    <p>{description}</p>
  </div>
);

const SDGImpactSection = ({ impactStats }) => {
  const sdgStats = impactStats.map((stat, index) => ({
    ...stat,
    badge: ["SDG 1", "SDG 3", "SDG 4", "SDG 5", "SDG 10", "SDG 13"][index],
    title: ["No Poverty", "Good Health and Well-being", "Quality Education", "Gender Equality", "Reduced Inequalities", "Climate Action"][index],
    description: [
      "By supporting the education of children from underprivileged backgrounds and creating livelihood opportunities for women, we aim to break the cycle of poverty at the grassroots level.",
      "Through menstrual hygiene management, mental health awareness, and access to basic healthcare education, we work towards building healthier communities, especially for women and children.",
      "We ensure inclusive and equitable quality education for children through school enrollments, Sunday classes, and value-based workshops that make learning accessible and engaging.",
      "By equipping women and youth with vocational skills like tailoring, sustainable product-making, and entrepreneurship. We promote financial independence and meaningful employment.",
      "Our initiatives target marginalized communities, ensuring that children and women from slums and underserved areas have equal access to opportunities and rights.",
      "We incorporate sustainability in our solutions such as reusable menstrual products and eco-friendly clothing while raising awareness about environmental responsibility at the community level."
    ][index]
  }));

  return (
    <section className={styles.impactContainer}>
      <div className={styles.sdgHeader}>
        <h1>Sustainable Development Goals</h1>
        <p>
          <span className={styles.blurred}>We</span> <span className={styles.focusWord}>Focus</span> <span className={styles.blurred}>On</span>
        </p>
      </div>

      <div className={styles.impactStats}>
        {sdgStats.map((stat, index) => (
          <SDGImpactCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default SDGImpactSection;