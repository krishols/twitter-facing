import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const SignOut = (props) => {
    
    localStorage.clear();
    window.location = '/';
          };
  
      export default SignOut;