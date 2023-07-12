import { Google, Twitter, Github } from '@/components/shared/icons';
import React from 'react'

type Props = {
  provider: string
}

const SignInBtnSelec = ({ provider }: Props) => {
  switch(provider) {
    case 'google':
      return (
        <>
          <Google className="w-5 h-5" />
          <p>Sign In with Google</p>
        </>
      );
    case 'facebook':
      return (
        <>
          <Twitter className="w-5 h-5" />
          <p>Sign In with Facebook</p>
        </>
      );
    case 'github':
      return (
        <>
          <Github className="w-5 h-5" />
          <p>Sign In with GitHub</p>
        </>
      );     
    default:
      return (
        <>
          <p>Sign In with Credentials</p>
        </>
      ); 
  }
};

export default SignInBtnSelec;