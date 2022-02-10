const data = {
  first: [
    {
      tags: [],
      title: {
        text: "default title",
      },
      description: "default desc",
      "desktop-image": {
        src: "https://awmedu.com/wp-content/uploads/2016/08/android-logo-200x200.jpg",
        alt: "Android",
      },
      "mobile-image": {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png",
        alt: "Test",
      },
    },
    {
      tags: [
        {
          type: "lifestage",
          tag: "puppy",
        },
      ],
      title: {
        text: "puppy title",
      },
      description: "puppy desc",
      "mobile-image": {
        src: "",
        alt: "Android",
      },
      "desktop-image": {
        src: "",
        alt: "Test",
      },
    },
  ],
};

let selectedTags = [];
