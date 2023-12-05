import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import Modal from './Modal';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

export default function AuthModal({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: () => void }): React.ReactElement {
  const [showSignup, setShowSignup] = useState(false);
  const signupLoginText = showSignup ? 'Already have an account?' : 'Don\'t have an account?';
  const signupToggleText = showSignup ? 'Log in' : 'Sign up' ;
  return <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    <Dialog.Title as="h3" className="text-lg font-medium leading-6">Welcome back to Coffee</Dialog.Title>
    <div className="mt-2">
      <div className="mb-2">
        <span>{signupLoginText} <a onClick={() => setShowSignup(!showSignup)}>{signupToggleText}</a></span>
      </div>
      <div>
        {showSignup ? <SignupForm /> : <LoginForm /> }
      </div>
    </div>
  </Modal>
}
