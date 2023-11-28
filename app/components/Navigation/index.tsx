"use client";
import { useState, memo } from "react";
import { geologica } from "@/app/styles/font";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import LoginModal from "@/app/components/Modal/LoginModal";

const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Coffees', href: '/coffees' },
    { name: 'Dashboard', href: '/dashboard' },
]

const NavContainer = memo(function () { return <></>})
NavContainer.displayName = 'NavContainer'

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <Disclosure as={({children}: { children?: React.ReactNode|React.ReactNode[]}): React.ReactElement =>
      <nav className="relative shadow-sm z-10">{children}</nav> }>
      {() => {
        return (
          <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8 shadow">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button
                    onClick={() => setOpen(!open)}
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center h-16 w-16 text-6xl text-center sm:justify-center">
                    <a href="/" className={`${geologica.className} font-semibold cursor-pointer text-maroon`}>C</a>
                  </div>
                  <div className="flex-1 hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 items-center h-full">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 hidden sm:mr-6 sm:flex sm:items-center sm:justify-end">
                    <button onClick={() => setLoginModalOpen(true)}>
                      <UserCircleIcon className="block h-8 w-8" aria-hidden="true" />
                    </button>
                    <LoginModal isOpen={loginModalOpen} setIsOpen={setLoginModalOpen}></LoginModal>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu panel */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
}
