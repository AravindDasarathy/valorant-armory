# Valorant Armory

Valorant Armory is a multi-page web application designed to showcase the extensive collection of skins available in Valorant, a popular free-to-play first-person shooter developed and published by [Riot Games](https://www.riotgames.com). The application allows users to explore, search, and view detailed information about skins, catering to both seasoned players and those new to the world of Valorant.

Valorant Armory showcases the integration of the [Valorant APIs](https://dash.valorant-api.com/) to display game skin information, emphasizing server-side rendering (SSR) for the initial load with client-side enhancements for interactivity

## Introduction
Valorant is a tactical first-person shooter game set in the near future. The game emphasizes gunplay, tactical decision-making, and team play. Valorant offers a range of cosmetic options, known as "skins," which allow players to **customize the appearance of their weapons**. These skins are purely cosmetic and do not affect gameplay.

## Features
- **Browse Skins by Weapon**: Users can explore skins grouped by specific weapons such as Vandal, Phantom, and more, offering a personalized browsing experience.
- **Browse Skins by Theme**: Discover skins sorted by unique themes, offering a curated browsing experience.
- **Complete Skins Gallery**: Scroll through the entire collection of Valorant skins, with options to filter based on preferences.
- **Search Functionality**: Global and local search bars allow users to find skins based on names, themes, or weapons.
- **Pagination**: Seamlessly navigate through skin collections with integrated pagination.
- **View Variants**: Detailed views of skins, including color variants and levels, through interactive modals.

## Technical Features
- **Server-Side Rendering (SSR)**: The initial page load renders server-side, optimizing performance and SEO.
- **Pagination**: Server-side pagination is implemented, allowing users to navigate through the dataset efficiently.
- **Jest Testing**: Utilizes Jest for writing tests, covering both server-side logic and rendering outcomes to ensure reliability and functionality.
- **Assets Hosting**: All client-side assets, including stylesheets, JavaScript files, and images, are hosted locally and served directly from the project repository.
- **Cache Implementation**: Implements server-side caching strategies to minimize redundant API calls and enhance the user experience by request round-trip time.
- **Mobile optimization and responsiveness** - Designed to ensure an optimal user experience across various devices, particularly mobile phones.

## Installation
Valorant Armory requires [Node.js](https://nodejs.org/) v16+ to run.
To get the Valorant Armory up and running on your local machine, follow these steps:
1. Clone the repository:
```sh
git clone https://github.com/yourusername/valorant-armory.git
cd valorant-armory
```
2. Install dependencies
```sh
npm install
```
3. Start the server
```sh
npm start
```
Open your browser and navigate to http://localhost:8080 to view the application.

## Running tests
To run the provided tests using Jest:
```sh
npm test
```