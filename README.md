## Movie Mobile Application
This is a native mobile application created by using:

 ```text
1. expo-cli         
2. react-native    
3. redux

api link - ""
```

### Development Guideline

#### Scripts

```bash
# install expo-cli (windows)
npm install -g expo-cli

# install expo-cli (linux, mac)
sudo npm install -g expo-cli

# install dependencies
npm install

# start the expo project
expo start

# build expo project (default)
expo build

# build expo project for ios
expo build:ios

# build expo project for android
expo build:android
```

#### Project Directories

```text
|-movie-app
          |   App.js
          |   app.json
          |
          |-assets      # fonts and images
          |
          |-components  # components which can be use by all the screens or modules
          |
          |-constants   # declare the variable or configuration which normally won't be change throughout the project
          |
          |-navigation  # declare the navigator for the project
          |
          |-screens     # screens or modules for this project
          |
          |-services    # api services
          |
          |-store       # redux -> actions and reducers
          |
          |-utils       #  functions or methods can be use by all the screens / modules
```

#### Screens / Modules Folder Structure

> under /screens folder, you may naming your screen
> as ExampleScreen, and just like structure below:

```text
├─ExampleScreen
    │   index.js
    │
    ├─components    # components that only be used by the this screen

```
