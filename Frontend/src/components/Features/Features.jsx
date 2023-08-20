import React from "react";

const Features = ({ img, title, desc }) => {
  return (
    <article className="services-card">
      <div className="img-container">
        <img src={img} alt={title} />
      </div>
      <h2 className="services-title">{title}</h2>
      <p className="services-subtitle">{desc}</p>
    </article>
  );
};

export default Features;
