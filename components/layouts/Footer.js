import React from 'react';
import { getNextEnv } from '../../utils/helper';

const Footer = () => (
  <footer>
    <strong>
      ©{new Date().getFullYear()} {getNextEnv('SITE_AUTHOR')} All rights reserved.
    </strong>
  </footer>
);

export default Footer;
