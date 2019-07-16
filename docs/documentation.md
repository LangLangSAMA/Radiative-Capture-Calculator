# RadiativeCaptureCalculator

## Folder Structure

    .
    ├── public                              # public files
    │   ├── index.html                      # base page file
    ├── src                                 # source files
    │   ├── index.js                        # file that initializes app
    │   ├── index.scss                      # basic page style
    │   ├── component                       # containing all the components used in this project
    │   ├── helper                          # data composition, extraction and computation
    │   ├── images                          # saving images rendered on page
    ├── docs                                # documentation files (alternatively `doc`)
    ├── package-lock.json & package.json    # npm, used to organize packages and libraries
    ├── LICENSE
    └── README.md

    This project uses `gh-pages` npm libraries to host the page on github. React Library is used to build and render front-end webpages and scss files are used to customize styles on the pages.

### Component Structure
    .
    ├── component
    │   ├── App                             # main application container
    │   ├── Header                          # header
    │   ├── Content                         # main application
    │   ├── Form                            # standard form, accept inputs and outputs
    │   ├── FormDisplay                     # specific form, only for display
    │   ├── Graph                           # eres vs max angle graph

    All scss files are styling.

### Helper Structure
    .
    ├── helper
    │   ├── compute                         # computation logics
    │   ├── data                            # all the data, and input definition
    │   ├── elementsAndIsotopes             # library
    │   ├── isotopes                        # isotope constructor
    