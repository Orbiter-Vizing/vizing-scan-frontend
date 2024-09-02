import { useAppStyles } from "src/App.styles";

export const App = (): JSX.Element => {
  const classes = useAppStyles();

  return (
    <div>
      <div className={classes.appHeader}>
        <h2>Welcome to Vizing Scan.</h2>
      </div>
      <p className={classes.appIntro}>
        Vizing Scan is a comprehensive search, API, and analytics platform
        designed to streamline the experience for developers and users dealing
        with omnichain transactions.
      </p>
    </div>
  );
};

export default App;
