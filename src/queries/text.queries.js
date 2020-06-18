import gql from 'graphql-tag'

export const CREATE_TEXT = gql`
  mutation createText(
    $email: String!,
    $text: String!
  ){
    createText(data: {
      status: PUBLISHED
      email: $email
      text: $text
      font: "'Stacked Pixel', sans-serif"
      size: "24px"
    }){
      id
      text
      font
      size
    }
  }
`

export const GET_TEXTS = gql`
  query getTexts($email: String!){
    texts(where: {email: $email}){
      id
      text
      font
      size
      color
      css
    }
  }
`

export const GET_TEXT_BY_ID = gql`
  query getTexts(
    $id: ID!
  ){
    texts(
      where: {
        id: $id
      }
    ){
      id
      text
      font
      size
      color
      css
    }
  }
`

export const UPDATE_TEXT = gql`
  mutation updateText(
    $id: ID!,
    $text: String!,
    $font: String!,
    $size: String!,
    $color: String!
  ){
    updateText(
      where: { id: $id }
      data: {
        text: $text
        font: $font
        size: $size
        color: $color
    }){
      id
      text
      font
      size
    }
  }
`

export const PUBLISH_TEXT = gql`
  mutation publishText($id: ID!) {
    publishText(
      where: {id: $id},
      to: PUBLISHED
    ){
      id
    }
  }
`