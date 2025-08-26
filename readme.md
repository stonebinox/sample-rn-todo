# Description

A simple todo app with React Native-Expo.

## Setup

If you do plan on running this locally:

1. Clone this repo
2. Run `npm i --legacy-peer-deps` to install dependencies
3. Run `npm start` to start the expo server
4. Download the expo app on your phone
5. Scan the QR code in the terminal with your phone's camera, select the URL found
6. This should open the Expo app and launch the app

## Access

If you've got the above working, you should have this on your phone. Alternatively, you can access this from [here](https://appetize.io/embed/b_2nnx3oodhzs5x2sluivpazhmn4?device=iphone16pro&launchUrl=exp%3A%2F%2Fu.expo.dev%2F933fd9c0-1666-11e7-afca-d980795c5824%3Fruntime-version%3Dexposdk%253A53.0.0%26channel-name%3Dproduction%26snack%3D%2540anoops%252Ftactless-violet-croissant%26snack-channel%3DKXdKTyJGYL&params=%7B"EXDevMenuDisableAutoLaunch"%3Atrue%2C"EXKernelDisableNuxDefaultsKey"%3Atrue%7D&appearance=light&deviceColor=black&scale=auto&orientation=portrait&centered=both).

## Pending Items

To respect a time cut-off of 2 hours, here's a bunch that can be done next:

1. Fixing minor bugs: animation state throws a warning - fairly minor fix
2. Getting everything pixel perfect: The AI agent made certain assumptions about the colour code in certain minor spots; minor change, but it's definitely worth cleaning up
3. Filters: adding filters would have been a great lift - to be able to filter by `label` or time would have been nice to see
4. Add coming soon to other empty sections: leaving them empty looks visibly incomplete.
5. A splash screen for an app is always nice!
6. Clean up performance on web: it works but in some expo web builds, the tab viewer seems to not render light theme, making the tabs look empty. Works fine on an actual device and the simulator/emulator.

---
