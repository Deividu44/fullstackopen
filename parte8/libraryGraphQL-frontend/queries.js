import { gql } from "@apollo/client"

export const query = gql`
  query allAuthors {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query allBooks {
  allBooks {
    author {
      name
    }
    title
    published
    genres
  }
}
`

export const BOOKS_BY_GENRE = gql`
query booksByGenre($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    genres
    author {
      name
    }
  }
}
`

export const CHANGE_BIRTH = gql`
mutation changeBirth($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    id
  }
}
`

export const LOGIN = gql`
mutation loginUser($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const USERLOGGED = gql`
query userLogged {
  me {
    favoriteGenre
  }
}

`
