import Image from 'next/image';
import { BookingForm } from '@/components/booking-form';
import {
  AnimatedLogo,
  AnimatedMetric,
  ConceptPreview,
  CostEstimator,
  FAQList,
  ParticleField,
  ProjectTracker,
  Reveal,
  TiltCard,
} from '@/components/home-interactions';

const services = [
  ['01', 'Business websites', 'A polished, responsive website that explains your offer and turns visitors into enquiries.', '▱'],
  ['02', 'E-commerce websites', 'A considered online storefront that makes browsing products and contacting your business simple.', '◇'],
  ['03', 'Portfolio websites', 'A distinctive digital home for your work, story and achievements.', '✳'],
  ['04', 'Landing pages', 'Focused pages for a product, campaign, launch or lead-generation goal.', '↗'],
  ['05', 'Custom web applications', 'Purpose-built web experiences for the workflows and features your business needs.', '⌘'],
  ['06', 'Website refresh', 'A fresh visual direction and clearer user journey for your existing website.', '⟳'],
];
const concepts = [
  ['Business presence', 'CORPORATE / BUSINESS', 'A clean digital presence for a growing service brand.'],
  ['Digital storefront', 'E-COMMERCE', 'A product-led shopping experience built around discovery.'],
  ['Creator portfolio', 'PORTFOLIO', 'A personal showcase that puts selected work front and centre.'],
];
export default function Home() {
  return <>
    <section className="hero3d" id="home">
      <ParticleField/>
      <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse-dot"/> DIGITAL STUDIO · INDIA</div>
        <h1>We build digital experiences that <span className="blue">move business forward.</span></h1>
        <p>RIXON partners with ambitious people and growing businesses to create thoughtful websites with clarity, craft and purpose.</p>
        <div className="actions"><a className="button" href="#booking">Start your project <b>↗</b></a><a className="button secondary" href="#work">Explore our work</a></div>
        <div className="hero-proof"><span>✦ Thoughtful design</span><span>✦ Responsive builds</span><span>✦ Direct collaboration</span></div>
      </div>
      <div className="hero-stage" aria-label="RIXON brand visual">
        <div className="stage-ring ring-a"/><div className="stage-ring ring-b"/>
        <div className="floating-chip chip-top"> <span className="chip-dot"/> DIGITAL EXPERIENCES </div>
        <AnimatedLogo/>
        <div className="floating-chip chip-bottom"><span className="chip-icon">✦</span> BUILT WITH PRECISION</div>
      </div>
    </section>

    <section className="trust-strip"><span>DESIGN WITH INTENTION</span><i/> <span>DEVELOP WITH PURPOSE</span><i/> <span>GROW WITH CONFIDENCE</span></section>

    <section className="section3d" id="services">
      <div className="section-heading"><div><div className="eyebrow">01 / WHAT WE DO</div><h2>Digital, made <span className="blue">deliberate.</span></h2></div><p>From a first business website to a custom digital experience, we shape the right solution around your audience and objectives.</p></div>
      <div className="service-grid3d">{services.map(([num,title,desc,icon],index)=><Reveal className="service-reveal" delay={index * .06} key={num}><TiltCard className="service-card3d"><div className="service-card-top"><span>{num} / SERVICE</span><b>{icon}</b></div><h3>{title}</h3><p>{desc}</p><a href="#booking">Discuss this service <span>↗</span></a></TiltCard></Reveal>)}</div>
    </section>

    <section className="work-section" id="work"><div className="section-heading"><div><div className="eyebrow">02 / SELECTED DIRECTIONS</div><h2>Ideas built to <span className="blue">stand out.</span></h2></div><p>A glimpse at the types of digital experiences we can create. These are concept directions, not completed client projects.</p></div>
      <div className="work-grid3d">{concepts.map(([title,tag,desc],i)=><Reveal className="work-reveal" delay={i * .08} key={title}><article className={`work-card work-${i+1}`}><div className="work-window"><div className="window-bar"><span/><span/><span/><small>RIXON / CONCEPT 0{i+1}</small></div><div className="window-art"><div className="art-line"/><div className="art-block"/><div className="art-dot"/></div></div><div className="work-meta"><small>{tag}</small><h3>{title}</h3><p>{desc}</p></div><ConceptPreview title={title} tag={tag} description={desc} number={`0${i+1}`}/></article></Reveal>)}</div>
    </section>

    <section className="proof-section">
      <Reveal><div className="proof-heading"><div className="eyebrow">BUILT AROUND YOUR BUSINESS</div><h2>Small studio. <span className="blue">Considered work.</span></h2></div></Reveal>
      <div className="metrics-strip"><AnimatedMetric value={6} label="core digital services"/><AnimatedMetric value={3} label="concept directions"/><AnimatedMetric value={1} suffix=":1" label="direct collaboration"/></div>
      <Reveal><section className="testimonial-honesty" aria-labelledby="testimonial-heading"><span className="quote-glyph" aria-hidden="true">“</span><div><div className="eyebrow">CLIENT TESTIMONIALS</div><h3 id="testimonial-heading">Good work deserves honest words.</h3><p>We’ll share customer feedback here only when it’s real and approved for publication. Until then, explore our project approach or tell us what you’re building.</p><a href="#booking">Start a conversation ↗</a></div></section></Reveal>
    </section>

    <section className="about-section" id="about"><div className="about-visual"><div className="about-cube"><div className="cube-face cube-front">R</div><div className="cube-face cube-side">X</div><div className="cube-face cube-top">✦</div></div><div className="about-caption">RIXON / EST. WITH INTENTION</div></div><div className="about-copy"><div className="eyebrow">03 / ABOUT RIXON</div><h2>Precision in the details. <span className="blue">Purpose in the outcome.</span></h2><p>RIXON PRIVATE LIMITED is a digital studio focused on creating useful, considered web experiences for businesses, creators and people with ideas to bring online.</p><div className="principles"><div><b>01</b><span><strong>Listen first.</strong><small>Understand the business before choosing the design.</small></span></div><div><b>02</b><span><strong>Clarity over clutter.</strong><small>Keep content, navigation and interactions focused.</small></span></div><div><b>03</b><span><strong>Build for people.</strong><small>Make it easier for the right people to connect with you.</small></span></div></div></div></section>

    <section className="estimator-section" id="estimate"><Reveal><div className="section-heading"><div><div className="eyebrow">04 / PROJECT PLANNER</div><h2>Get a feel for your <span className="blue">investment.</span></h2></div><p>Adjust a few project details to see an indicative planning range before you enquire.</p></div></Reveal><CostEstimator/></section>

    <section className="tracking-section" id="track"><Reveal><div className="section-heading"><div><div className="eyebrow">05 / PROJECT TRACKING</div><h2>Your project, <span className="blue">in view.</span></h2></div><p>Securely check the latest enquiry status with your project reference and booking email.</p></div></Reveal><ProjectTracker/></section>

    <section className="faq-section" id="faq"><Reveal><div className="section-heading"><div><div className="eyebrow">06 / QUICK ANSWERS</div><h2>Frequently asked <span className="blue">questions.</span></h2></div><p>More details about the way RIXON works, what to expect, and how to get started.</p></div></Reveal><FAQList/></section>

    <section className="contact-section" id="contact"><div className="section-heading"><div><div className="eyebrow">07 / GET IN TOUCH</div><h2>Let's start a <span className="blue">conversation.</span></h2></div><p>Have a question or an early idea? Reach RIXON directly using your preferred channel.</p></div><div className="contact-grid3d"><a className="contact-card3d" href="tel:+917305855341"><span className="contact-icon">☎</span><small>GIVE US A CALL</small><strong>+91 7305855341</strong><span>Call RIXON ↗</span></a><a className="contact-card3d" href="mailto:rixonprivatelimited@gmail.com"><span className="contact-icon">✉</span><small>WRITE TO US</small><strong>Business email</strong><span>rixonprivatelimited@gmail.com ↗</span></a><a className="contact-card3d" href="https://wa.me/917305855341?text=Hello%20RIXON%2C%20I%20would%20like%20to%20discuss%20a%20website%20project." target="_blank" rel="noreferrer"><span className="contact-icon">◉</span><small>QUICK CONVERSATION</small><strong>WhatsApp</strong><span>Chat with our studio ↗</span></a></div></section>

    <section className="booking-section" id="booking"><div className="booking-intro"><div className="eyebrow">08 / YOUR PROJECT STARTS HERE</div><h2>Have an idea? <span className="blue">Let's build it.</span></h2><p>Share a few details about your project. RIXON will review your enquiry and contact you to discuss the scope and next steps.</p><div className="booking-points"><span>✓ No payment required to enquire</span><span>✓ A real conversation about your goals</span><span>✓ Clear scope before work begins</span></div><div className="booking-direct"><small>PREFER TO TALK DIRECTLY?</small><a href="https://wa.me/917305855341" target="_blank" rel="noreferrer">WhatsApp RIXON ↗</a></div></div><div className="booking-form-wrap"><BookingForm/></div></section>

    <section className="final-cta"><div className="final-cta-glow"/><div className="eyebrow">RIXON PRIVATE LIMITED</div><h2>Your next digital move<br/><span className="blue">starts here.</span></h2><a className="button" href="#booking">Book your website ↗</a><div className="final-logo"><Image src="/images/rixon-logo.png" alt="RIXON Private Limited" width={190} height={130}/></div></section>
  </>;
}
