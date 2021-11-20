// Redux's combineReducers() function will allow us to write separate reducers for each of the resources in our application (autorhos and books)
// Each reducer is passed to the combineReducers() function, which will produce a single reducer
// We then pass that combined reducer to the store in src/index.js
import { combineReducers } from "redux";

// this package handle unique ID generation
import uuid from "uuid";

// We're telling Redux to produce a reducer which will return a state that has 2 keys:
// Key 1: Authors with a value equal to the return value of the authorsReducer()
// Key 2: Books with a value equal to the return value of booksReducer()
// Both keys return a default state of an empty array -> []
// This will produce the same initial state that we originally specified (see code below state = {authors: [], books: []})
const rootReducer = combineReducers({
  authors: authorsReducer,
  books: booksReducer
})

export default rootReducer;

function booksReducer(state = [], action) {
  let idx;
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.book]

    case "REMOVE_BOOK":
      idx = state.findIndex(book => book.id === action.id)
      return [...state.slice(0, idx), ...state.slice(idx + 1)]

    default:
      return state
  }
}

// This reducer only concerns itself with its own slice of the state
// The array that the authorsReducer() returns will be the value associated with the key of authors in the state object
// Consequently, the authorsReducer() should only receive as its state argument the value of state.authors (the authors array)
// We no longer need to retrieve the list of authors with a call to state.authors, simply call state
function authorsReducer(state = [], action) {
  let idx;
  switch (action.type) {
    case "ADD_AUTHOR":
      return [...state, action.author]

    case "REMOVE_AUTHOR":
      idx = state.findIndex(author => author.id === action.id)
      return [...state.slice(0, idx), ...state.slice(idx + 1)]

    // Check to see if any of the authorName's currently stored in state match the name dispatched from the Book input component
    // If the name already exists, state is returned unchanged
    // If the name is not present, it is added to the authors array
    // This way, we're able to add authors and books
    case "ADD_BOOK":
      let existingAuthor = state.filter(
        author => author.authorName === action.book.authorName
      )
      if (existingAuthor.length > 0) {
        return state
      } else {
        return [...state, { authorName: action.book.authorName, id: uuid() }]
      }

    default:
      return state
  }
}

// Before combineReducers() function:
/*
export default function bookApp(
  state = {
    authors: [],
    books: []
  },
  action
) {
  let idx;
  switch (action.type) {
    case "ADD_BOOK":
      return {
        ...state,
        authors: [...state.authors],
        books: [...state.books, action.book]
      };

    case "REMOVE_BOOK":
      idx = state.books.findIndex(book => book.id === action.id);
      return {
        ...state,
        authors: [...state.authors],
        books: [...state.books.slice(0, idx), ...state.books.slice(idx + 1)]
      };

    case "ADD_AUTHOR":
      return {
        ...state,
        books: [...state.books],
        authors: [...state.authors, action.author]
      };

    case "REMOVE_AUTHOR":
      idx = state.authors.findIndex(author => author.id === action.id);
      return {
        ...state,
        books: [...state.books],
        authors: [...state.authors.slice(0, idx), ...state.authors.slice(idx + 1)]
      };

    default:
      return state;
  }
}
*/