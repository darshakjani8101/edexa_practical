import classes from "./UserProfile.module.css";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const staticQuotes = [
  {
    id: 1,
    text: "Test_1",
  },
  {
    id: 2,
    text: "Test_2",
  },
  {
    id: 3,
    text: "Test_3",
  },
];

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const UserProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const authCtx = useContext(AuthContext);

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(staticQuotes, isSortingAscending);

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? "desc" : "asc"}`,
    });
  };

  return (
    <section className={classes.profile}>
      <h1>Welcome {authCtx.fname}!</h1>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <li key={quote.id}>
            {quote.id} {quote.text}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserProfile;
