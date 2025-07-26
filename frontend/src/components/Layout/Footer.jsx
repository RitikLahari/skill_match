import React, { useContext } from 'react';
import { Context } from '../../main';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { RiInstagramFill } from 'react-icons/ri';

function Footer() {
  const { isAuthorized } = useContext(Context);
  return (
    <footer
      className={isAuthorized ? 'footerShow' : 'footerHide'}
      style={{
        background: '#181818',
        color: '#fff',
        padding: '32px 0 16px 0',
        textAlign: 'center',
        fontFamily: 'Inter, Arial, sans-serif',
        boxShadow: '0 -2px 16px rgba(0,0,0,0.08)',
        marginTop: '40px',
      }}
    >
      <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '12px' }}>
        &copy; {new Date().getFullYear()} Skill-Match. All Rights Reserved.
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '12px' }}>
        <a
          href='https://github.com/RitikLahari'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: '#fff', fontSize: '24px', transition: 'color 0.2s' }}
        >
          <FaGithub />
        </a>
        <a
          href='https://leetcode.com/u/ritik_lahari01/'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: '#fff', fontSize: '24px', transition: 'color 0.2s' }}
        >
          <SiLeetcode />
        </a>
        <a
          href='https://in.linkedin.com/in/ritik-lahari-267213254'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: '#fff', fontSize: '24px', transition: 'color 0.2s' }}
        >
          <FaLinkedin />
        </a>
        {/* Uncomment to add Instagram */}
        {/* <a
          href='https://www.instagram.com/exclusiveabhi/'
          target='_blank'
          rel='noopener noreferrer'
          style={{ color: '#fff', fontSize: '24px', transition: 'color 0.2s' }}
        >
          <RiInstagramFill />
        </a> */}
      </div>
      <div style={{ fontSize: '14px', color: '#aaa' }}>
        Designed & Developed by <span style={{ color: '#fff', fontWeight: 'bold' }}>Ritik Lahari</span>
      </div>
    </footer>
  );
}

export default Footer;