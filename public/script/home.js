/*axios
  .get('http://localhost:3000/api/posts', { headers: { token: localStorage.getItem('token')}})
  .then(response => {
    const posts = document.getElementById('posts');
    response.data.forEach(post => {
      const newPost = document.createElement('li')
      newPost.innerHTML = post.title;
      posts.appendChild(newPost)
    })
  })*/

document.getElementById('navBarSalir').addEventListener("click", function() {
  localStorage.clear();
  window.location.reload()
})

window.onload = function () {
  document.getElementById('navUser').innerHTML = localStorage.getItem('name') + " " + localStorage.getItem('surname');
}