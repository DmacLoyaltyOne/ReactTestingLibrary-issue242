const Enzyme = require('enzyme')
import React from 'react'
const Adapter = require('enzyme-adapter-react-16')
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

Enzyme.configure({
  adapter: new Adapter()
})

// Globally mock next.js configuration
jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {}
}));

//jest.mock("./client/components/Profile/ProfileIcon.tsx", () => () => "SomeComponent")

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withNamespaces: () => Component => {
    Component.defaultProps = {
      ...Component.defaultProps,
      t: () => ""
    };
    return Component;
  },
  I18nextProvider: props => {
    const children = props.children

    return (
      <>
        { children }
      </>
    )
  },

  Trans: props => {
    const children = props.children
    return (
      <>
        { children }
      </>
    )
  }
}));

window.matchMedia = window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () { },
      removeListener: function () { }
    }
  }
