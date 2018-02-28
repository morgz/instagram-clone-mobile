import gql from 'graphql-tag';

export default gql`
  mutation($photoId: ID!, $text: String!) {
    createComment(text: $text, photoId: $photoId) {
      id
      text
    }
  }
`;
