import React from "react";
import Chat from "../../assets/icon-chat.webp";
import Money from "../../assets/icon-money.webp";
import Security from "../../assets/icon-security.webp";
import Features from "../../components/Features/Features";

const Home = () => {
  return (
    <main>
      <section className="hero">
        <div className="hero-banner">
          <article className="hero-content"> 
            <h2>
              No fees. <br />
              No minimum deposit. <br />
              High interest rates.
            </h2>
            <p>Open a savings account with Argent Bank today!</p>
          </article>
        </div>
      </section>
      <section className="services">
        <Features
          img={Chat}
          title="You are our #1 priority"
          desc="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <Features
          img={Money}
          title="More savings means higher rates"
          desc="The more you save with us, the higher your interest rate will be!"
        />
        <Features
          img={Security}
          title="Security you can trust"
          desc="We use top of the line encryption to make sure your data and money is always safe."
        />
      </section>
    </main>
  );
};

export default Home;
// src={HeroImg}
// alt="Arbre avec un pot d'argent"
