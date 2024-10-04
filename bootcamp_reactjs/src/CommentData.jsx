import { faker } from '@faker-js/faker';

const CommentData = [
    {
      name: "Asep",
      time: "Today at 5:00PM",
      comment: "Mantapzzzzssss!",
      photo: faker.image.avatar()
    },
    {
      name: "Bambang",
      time: "Today at 10:15PM",
      comment: "ada apa ini?!",
      photo: faker.image.avatar()
    },
    {
      name: "Munaroh",
      time: "Yesterday at 2:30PM",
      comment: "Keren banget!",
      photo: faker.image.avatar()
    },
    {
      name: "Dewanto",
      time: "4 days ago",
      comment: "mantuls!",
      photo: faker.image.avatar()
    },
    {
      name: "Tatang",
      time: "3 years ago",
      comment: "woaaaaaaahhhhhhhhhhhh",
      photo: faker.image.avatar()
    }
  ];
  
  export default CommentData;