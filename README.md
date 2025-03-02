# TODO: Branch gitflow strategy, not implemented stuff, use case decisions, FIX PROJECT FOLDER STRUCTURE
# GitHub Issues Browser

A React Native mobile application that allows users to browse issues from the [React Native repository](https://github.com/facebook/react-native) using [GitHub's GraphQL API](https://docs.github.com/en/graphql). Users can search for issues, filter them by state (open/closed) and by a term, and view detailed information including comments. 

## Technical Decisions

### Why React Native & Expo?
I chose React Native with Expo for this project to create a cross-platform mobile application that delivers a native experience. Expo provides excellent developer tools, simplified setup, and quick iteration cycles, making it ideal for this assignment. 

### GraphQL Client - Apollo
Apollo Client was used to interact with GitHub's GraphQL API as specified in the assignment requirements. It provides a robust solution for querying GraphQL endpoints, managing cache, and handling pagination, which is essential for browsing large repositories like React Native.

### Navigation - Expo Router
For navigation, I implemented Expo Router which provides a file-based routing system similar to Next.js. This approach simplifies navigation logic and provides a more intuitive project structure. At this stage navigation is quite simple, but Expo Router would make it really easy to provide an scalable solution.

### TypeScript
The entire project is written in TypeScript, providing type safety and improving development experience through better IDE support and early error detection. This was especially valuable when working with GraphQL's complex response structures.

### Component Architecture
I adopted a component-based architecture with clear separation of concerns:
- Reusable UI components for common elements
- Custom hooks for data fetching and business logic
- Screen components for page layout
- Type definitions for API responses and component props

### State Management
For state management, I utilized React's built-in hooks (useState, useEffect) along with Apollo's query hooks. For more complex state handling, I created custom hooks that encapsulate data fetching logic and state transformations, tailors the specific variables the presentation layer needs and provide them.

### Type Safety
GitHub's GraphQL API responses are properly typed using interfaces, providing compile-time checking and better developer experience. This helps prevent runtime errors and makes the codebase more maintainable.

### CI 
A basic CI pipeline is running on every pull request. This runs a typechecking script.

### Error Handling & Loading States
The application implements comprehensive error handling and loading states, ensuring a smooth user experience even when network issues occur or when data is loading.

## Available Features

- Browse open and closed issues from the React Native repository
- Search issues by title and body content
- Toggle between open and closed issues
- View issue details including author information and creation date
- Read issue comments 
- Pull-to-refresh for the latest data
- Infinite scrolling to load more issues

## Project Structure
```bash
├── app/                     # Expo Router pages
│   ├── _layout.tsx          # Root layout
│   ├── index.tsx            # Issues list screen
│   └── [id].tsx             # Issue detail screen
├── components/              # Reusable components
│   ├── ErrorView.tsx        # Error display
│   ├── HomeHeader.tsx       # App header with filters
│   ├── IssueCard.tsx        # Issue list item
│   ├── IssuesList.tsx       # Issues list with loading states
│   ├── LoadingView.tsx      # Loading indicator
│   ├── SearchBar.tsx        # Search input with debounce
│   └── ...
├── hooks/                   # Custom hooks
│   ├── useRefresh.ts        # Pull-to-refresh logic
│   ├── useSearchIssues.ts   # Issues fetching and pagination
│   └── useGetIssueDetail.ts # Issue detail fetching
├── graphql/                 # GraphQL queries
│   └── apolloClient.ts      # Apollo Client setup
│   └── queries/
│       ├── searchIssues.ts  # Query for issue listing
│       └── getIssueDetail.ts # Query for issue details
├── types/                   # TypeScript definitions
│   ├── github.ts            # GitHub API types
│   └── hooks.ts             # Custom hook types
├── .github/                 # GitHub Actions
│   └── workflows/
│       └── typecheck.yml    # Type checking workflow
├── App.tsx                  # Entry point
└── package.json
```

## Prerequisites

Before you can run this project, you need the following prerequisites:

1. **Node.js**: Version 18 or newer
2. **npm** or **yarn**: For package management
3. **Expo CLI**: For running and building the app
4. **GitHub Access Token**: For accessing GitHub's GraphQL API

## Running the Project

1. **Clone the repository**:

```bash
git clone https://github.com/exogenesispr/rn-github-explorer
cd rn-github-explorer
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
```

3. **Set up the environment** : 
Create a .env file in the project root with your GitHub token:

```bash
EXPO_PUBLIC_GITHUB_TOKEN=your_personal_access_token
```
Note: Your token needs permission to read public repositories

4. **Start the development server**:
```bash
npx expo start
```
5. **Run on a device or emulator**:
- Press 'a' to run on an Android emulator
- Press 'i' to run on an iOS simulator
- Press 'w' to run the web version
- Scan the QR code with the Expo Go app on your device (**using SDK 52**)

## Future improvements
- Add unit and integration tests
- Extend automated CI/CD with GitHub Actions
- Implement pagination for issue comments
- Add markdown rendering for issue bodies and comments
- Extended error handling and retry mechanisms

## Acknowledgments:
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [React Native](https://reactnative.dev/)
- [Apollo Client](https://www.apollographql.com/docs/react)
- [Expo](https://docs.expo.dev/)