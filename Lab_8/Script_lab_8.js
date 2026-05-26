// 1
function counter(n) {
  let current = n;
  console.log(current);
  if (current === 0) return;
  const id = setInterval(() => {
    current--;
    console.log(current);
    if (current === 0) {
      clearInterval(id);
    }
  }, 1000);
}

function createCounter(n) {
  let current = n;
  let timerId = null;
  return {
    start() {
      // если уже запущен
      if (timerId !== null) return;
      console.log(current);
      // если дошли до 0
      if (current === 0) return;
      timerId = setInterval(() => {
        current--;
        console.log(current);
        if (current === 0) {
          clearInterval(timerId);
          timerId = null;
        }
      }, 1000);
    },
    pause() {
      if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        console.log("Пауза");
      }
    },

    stop() {
      if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
      }
      current = n;
      console.log("Счетчик сброшен");
    }
  };
}
const myCounter = createCounter(5);
// 2
function delay(N) {
  return new Promise(resolve => setTimeout(resolve, N * 1000));
}
async function counterWithDelay(n) {
  for (let i = n; i >= 0; i--) {
    console.log(i);
    if (i > 0) {
      await delay(1);
    }
  }
}
async function getFirstRepoName(username) {
  const userResponse =
    await fetch(`https://api.github.com/users/${username}`);
  const userData = await userResponse.json();
  const reposResponse =
    await fetch(userData.repos_url);
  const repos = await reposResponse.json();
  return repos[0]?.name || null;
}


// 3
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}
async function loadJson(url) {
  const response = await fetch(url);
  if (response.status === 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}
async function getGithubUser() {
  while (true) {
    const name =
      prompt("Введите логин?", "iliakan");
    try {
      const user =
        await loadJson(
          `https://api.github.com/users/${name}`
        );
      alert(`Полное имя: ${user.name}.`);
      return user;
    } catch (err) {
      if (
        err instanceof HttpError &&
        err.response.status === 404
      ) {
        alert(
          "Такого пользователя не существует, повторите ввод."
        );
        continue;
      } else {
        throw err;
      }
    }
  }
}