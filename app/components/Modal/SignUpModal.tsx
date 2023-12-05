import { Dialog } from '@headlessui/react';
import Modal from './Modal';

function SignupModal({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: () => void }): React.ReactElement {
  return <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    <Dialog.Title as="h3" className="text-lg font-medium leading-6">Welcome back to Coffee</Dialog.Title>
    <div className="mt-2">
        <form action='/api/v0/user'>
          <div className="mb-12">
            <label htmlFor="" className="mb-[10px] block text-base font-medium text-dark dark:text-white">
              Username
            </label>
            <input type="text" placeholder="Username" className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2" />
            <label htmlFor="" className="mb-[10px] block text-base font-medium text-dark dark:text-white">
              Password
            </label>
            <input type="password" placeholder="Password" className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2" />
            <label htmlFor="" className="mb-[10px] block text-base font-medium text-dark dark:text-white">
              Confirm Password
            </label>
            <input type="password" placeholder="Confirm Password" className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2" />
            <div className="mt-6 mb-10">
              <input
                      type="submit"
                      value="Sign In"
                      className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90 bg-maroon"
                    />
            </div>
          </div>
        </form>
    </div>
  </Modal>;

}

export default SignupModal;