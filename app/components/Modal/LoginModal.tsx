import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

function Modal({ isOpen, setIsOpen, children }: { isOpen: boolean, setIsOpen: Function, children?: React.ReactNode }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative inset-0 z-20 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="bg-white rounded-lg p-4 sm:max-w-3xl w-96 z-20 relative mx-auto">
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function LoginModal(): React.ReactNode {
  return <>
    <Dialog.Title as="h3" className="text-lg font-medium leading-6">Welcome back to Coffee</Dialog.Title>
    <div className="mt-2">
      <div className="mb-12">
        <label htmlFor="" className="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Username
        </label>
        <input type="text" placeholder="Username" className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2" />
        <label htmlFor="" className="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Password
        </label>
        <input type="password" placeholder="Password" className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2" />
      </div>
    </div>
  </>;
}

export default Modal;
