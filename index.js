const buttonSearch = document.querySelector('button')
buttonSearch.addEventListener('click', () => {
    searchPost()
})
async function getPost(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

async function getComments(postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

async function searchPost() {
    const postId = document.querySelector('#postId').value;

    if (postId < 1 || postId > 100) {
        alert('Id должен быть цифрой от 1 до 100');
        return;
    }
    try {
        const post = await getPost(postId);

        const postDiv = document.createElement('div');
        postDiv.style.border = '1px solid black'
        postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
        document.body.appendChild(postDiv);

        const commentBtn = document.createElement('button');
        commentBtn.textContent = 'Получить коментарии';
        commentBtn.addEventListener('click', async () => {
            try {
                const comments = await getComments(postId);

                const commentDiv = document.createElement('div');
                commentDiv.style.border = '1px solid black'
                commentDiv.innerHTML = '<h3>Кооментарии:</h3>';
                comments.forEach(comment => {
                    const commentItem = document.createElement('p');
                    commentItem.textContent = comment.body;
                    commentDiv.appendChild(commentItem);
                });
                document.body.appendChild(commentDiv);
            } catch (error) {
                console.log(error);
            }
        });
        document.body.appendChild(commentBtn);
    } catch (error) {
        console.log(error);
    }
}

