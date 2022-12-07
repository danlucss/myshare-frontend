export const userQuery = userId => {
    const query = `*[_type == "user" && _id == "${userId}"]`;

    return query;
};

export const searchQuery = searchTerms => {
    const query = `*[_type == "pin" && title match "${searchTerms}*" || category match "${searchTerms}*" || about match "${searchTerms}*"]{
    image {
        asset -> {
            url
        }
    },
    _id,
    destination, 
    postedBy -> {
        _id,
        userName,
        image,
    }, 
    save[]{
        _key, 
        postedBy -> {
            _id,
            userName,
            image,
        },
    },
}`;
    return query;
};

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
    image {
        asset -> {
            url
        }
    },
    _id,
    destination, 
    postedBy -> {
        _id,
        userName,
        image,
    }, 
    save[]{
        _key, 
        postedBy -> {
            _id,
            userName,
            image,
        },
    },
}`;

export const pinDetailsQuery = pinId => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
    return query;
};

export const pinDetailsMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
};

export const categories = [
    {
        name: "Poems",
        icon: "📝",
    },
    {
        name: "Nature",
        icon: "🌳",
    },
    {
        name: "Animals",
        icon: "🐶",
    },
    {
        name: "Art",
        icon: "🎨",
    },
    {
        name: "Food",
        icon: "🍕",
    },
    {
        name: "Travel",
        icon: "✈️",
    },
    {
        name: "Music",
        icon: "🎵",
    },
    {
        name: "Sports",
        icon: "🏀",
    },
    {
        name: "Fashion",
        icon: "👗",
    },
    {
        name: "Technology",
        icon: "💻",
    },
    {
        name: "Science",
        icon: "🔬",
    },
    {
        name: "History",
        icon: "📜",
    },
    {
        name: "Education",
        icon: "📚",
    },
];
