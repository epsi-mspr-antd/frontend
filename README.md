# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Description & App progression

### The design of every pages 

  Every pages has to be cut in 4 parts : 
  - The upper part --> height : 10% of screen, width: 100% of screen
  - The main part --> height : 80-85% of screen, width: 2 parts. Main parts will take 100% if the right isn't here, otherwise it will be 75-80%
  - The lower part --> height : 10% of screen, width: 100% --> Will contain 90% of the time the Hamburger menu // Map menu

  --> To keep this organisation, every pages MUST RETURN the ReactElement : "BentoGeneric". (except for the map page). This element accept 3 ReactElement and a boolean to decide if the burger menu appears or not.

### Landing Page

Most of the works has been done for a visual. Need to confirm this visual and do small modifications.
Last task on it : 
- Adding router
- Adding Hamburger close/open menu
- OPTIONNAL UX: Adding song with button ON/OFF

The landing page structure is based on a bento design. We need to be careful if it's suit the mobile experience.


### Map pages

We need to build 2 pages for the maps : one for the guardians and one for those who are trying to make their plants safe.

The pages has to be simple : 
- One same hamburger menu
- Logo icon to come back to the menu
- Buttons realted to the mains functions of the map (filter if it's a guardian or add/remove if it's a client)


### Login / Register Page

  We need to establish a communication with back to know how to handle the login and wich informations are necessary in the register.
  A good feedback is the most important part on both of the pages to make it easier to understand and complete it.

 // OPTIONNAL : We might want to add pre-configure context when the account is created.


### Account pages

The most complex pages of the front.

We could work with tab Route so that the first upper part of the mobile would be fixed and display all of the options in the account. It will take 10% of the screen height.

The main part will cover 80% - 85% of the screen. A first part on the left side will cover 70-80% of the width screen. That part will display the main informations of our active's tab. This will be about input, textArea,.... 
On the right side of the main part, we could add buttons wich provide the main functionnalities of the active's tab, like : adding a plant, editing a plant, filter, ..... This would call a singleton's service wich will only be called is display (creation of an instance when the component is called and then be destroyed) 


The bottom part will have a hamburger Menu. (Footer Component)



### Component Driven :

- Footer Component to create with a Hamburger Menu on the right side and a Map Route Icon. the Map need to have different route depending on the type of account (if the account ca do both, do we need to add two Incons, or an Icon that brings a choice ?). the map Icon must be hidden if the User isn't logged. 

  Data to have :
    - isLogIn
    - user.profileValue (guardian / client / ....)
    - isMapMode


- Home / Route component : Landing page. This will call either a "first landing page" if you are not logIn or a profile driven page that allow access to all user's actions
  Data to have :
  - isLogin
  - Component page
  - Footer Component
  - Header Component
  - First Landing Component
  - User Landing Component


  ## The router

  The router can be found in main.tsx

    To add a route, you must add an object into the array of router const. There are 2 required fields : path : '/...' and element which is either a HTML code or and ReactElement. We can also add async code there to ensure that the data must be ready before getting the React/html Element.

    Current route : 
    - Login
    - Register 
    - Account
    - Map (must do test to check if it's dynamic)

## TODO 

 Need to : 
 add the Account - Plants page in priority with an API call
 add the Add Plant page with an API post
 Modify the settings page with more padding
 add the Account - Properties page
 add the Add property page
