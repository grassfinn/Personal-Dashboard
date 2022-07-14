const author = document.getElementById('author')
const backupImage = {
  image:
    'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTc4MDkzNzU&ixlib=rb-1.2.1&q=80',
  publisher: 'Ken Cheung',
};

// unsplash api
    fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
    .then(res => res.json())
    .then(data => {
      document.body.style.backgroundImage = `url(${data.urls.full})`;
      author.textContent = data.user.name
    })
    // throws and error if api call goes wrong
    .catch(err => {
      console.log('Something went wrong!')
      // set up default image
      document.body.style.backgroundImage = `url(${backupImage.image})`
      author.textContent = backupImage.publisher
    })


