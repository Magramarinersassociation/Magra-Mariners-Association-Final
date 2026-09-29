import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaCrown } from 'react-icons/fa';
import './Committee.css';

const Committee = ({ data }) => {
  return (
    <section id="committee" className="committee-section section-padding">
      <div className="section-header">
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </div>

      {/* PATRONS SECTION — PLACED AT THE VERY TOP */}
      {data.patrons && data.patrons.length > 0 && (
        <div className="patrons-section">
          <div className="patrons-header">
            <span className="patrons-badge">
              <FaCrown className="patron-badge-icon" /> HONOURABLE PATRONS
            </span>
            <h3 className="patrons-title">Patrons</h3>
            <div className="patrons-divider"></div>
          </div>

          <div className="patrons-grid">
            {data.patrons.map((patron, idx) => (
              <motion.div
                key={patron.id || idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="patron-card-wrapper"
              >
                <div className="patron-card glassmorphism">
                  <div className="patron-img-container">
                    <img src={patron.image} alt={patron.name} className="patron-img" />
                    <div className="patron-img-border"></div>
                  </div>
                  <div className="patron-info">
                    <span className="patron-role-tag">{patron.position}</span>
                    <h3 className="patron-name">{patron.name}</h3>
                    <p className="patron-official-title">{patron.title}</p>
                    {patron.bio && <p className="patron-bio">{patron.bio}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ADVISOR COMMITTEE SECTION — PLACED DIRECTLY BELOW PATRONS & ABOVE EXECUTIVE MEMBERS */}
      {data.advisorMembers && data.advisorMembers.length > 0 && (
        <div className="advisor-committee-section">
          <div className="advisor-committee-header">
            <h3 className="advisor-committee-title">Advisor Committee</h3>
            <div className="advisor-committee-divider"></div>
          </div>
          <div className="advisor-members-grid">
            {data.advisorMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="executive-member-tag advisor-member-tag glassmorphism"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(223, 186, 115, 0.5)' }}
              >
                <span className="member-bullet advisor-bullet">🎖️</span>
                <div className="member-details">
                  <span className="member-name">{member.name}</span>
                  <span className="member-position">{member.position}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* EXECUTIVE COMMITTEE SECTION */}
      <div className="exec-committee-header-divider">
        <h3 className="exec-committee-heading">Executive Committee</h3>
        <div className="exec-committee-underline"></div>
      </div>

      <div className="committee-cards-container">
        {data.members.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: (idx % 4) * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="committee-card-wrapper"
          >
            {/* Gravity UI Card with glassmorphism CSS class */}
            <div className="committee-card glassmorphism">
              {/* Title & Position */}
              <div className="committee-info">
                <span className={`committee-badge ${idx % 2 === 0 ? 'badge-maroon' : 'badge-green'}`}>
                  {member.position}
                </span>
                <h3 className="committee-name">{member.name}</h3>
                <p className="committee-bio">{member.bio}</p>
              </div>

              {/* Social Media Links */}
              <div className="committee-socials">
                <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="social-icon-btn facebook" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-icon-btn twitter" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn linkedin" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href={`mailto:${member.socials.email}`} className="social-icon-btn email" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* General Executive Members list */}
      {data.executiveMembers && data.executiveMembers.length > 0 && (
        <div className="executive-members-section">
          <h3 className="executive-members-title">Executive Members</h3>
          <div className="executive-members-divider"></div>
          <div className="executive-members-grid">
            {data.executiveMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="executive-member-tag glassmorphism"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(30, 215, 96, 0.4)' }}
              >
                <span className="member-bullet">⚽</span>
                <div className="member-details">
                  <span className="member-name">{member.name}</span>
                  <span className="member-position">{member.position}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Committee;
