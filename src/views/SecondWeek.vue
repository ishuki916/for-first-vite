<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const user = ref({
  email: '',
  password: ''
})
const newUser = ref({
  email: '',
  password: '',
  nickname: ''
})
const loginErrMsg = ref('')
const signUpErrMsg = ref('')
const showModal = ref(false)
const showTodo = ref(false)
const showLogin = ref(true)
const toDoList = ref([])
const content = ref('')
const showEdit = ref(false)

const closeModal = () => {
  showModal.value = false
  signUpErrMsg.value = ''
}

const login = async () => {
  loginErrMsg.value = ''
  try {
    const res = await axios.post('https://todolist-api.hexschool.io/users/sign_in', user.value)
    showLogin.value = false
    showTodo.value = true
    document.cookie = `tkn=${res.data.token}; expires=${res.data.exp};path=/; `
  } catch (err) {
    console.log(err.response.data.message)
    loginErrMsg.value = err.response.data.message
  }
}

const signUp = async () => {
  signUpErrMsg.value = ''
  loginErrMsg.value = ''

  try {
    const res = await axios.post('https://todolist-api.hexschool.io/users/sign_up', newUser.value)
    showModal.value = false
  } catch (err) {
    console.log(err.response.data.message)
    signUpErrMsg.value = err.response.data.message
  }
}

const signOut = async () => {
  try {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tkn\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    const res = await axios.post(
      'https://todolist-api.hexschool.io/users/sign_out',
      {},
      {
        headers: {
          authorization: myCookie
        }
      }
    )

    if (res) {
      showLogin.value = true
      showTodo.value = false
      document.cookie = `tkn=; max-age=0;path=/; `
    } else {
      alert('有錯誤')
    }
  } catch (err) {
    console.log(err.response.data.message)
  }
}

onMounted(async () => {
  if (document.cookie.includes('tkn=')) {
    showLogin.value = false
    showTodo.value = true
  } else {
    showLogin.value = true
    showTodo.value = false
  }
})

watch(showTodo, async (newVal) => {
  try {
    if (newVal) {
      const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tkn\s*\=\s*([^;]*).*$)|^.*$/, '$1')
      const res = await axios.get('https://todolist-api.hexschool.io/todos', {
        headers: {
          authorization: myCookie
        }
      })

      toDoList.value = res.data.data
    }
  } catch (err) {
    console.log(err.response.data.message)
  }
})

const insertTodo = async () => {
  try {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tkn\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    const res = await axios.post(
      'https://todolist-api.hexschool.io/todos',
      { content: content.value },
      {
        headers: {
          authorization: myCookie
        }
      }
    )
    toDoList.value.push(res.data.newTodo)
  } catch (err) {
    console.log(err.response.data.message)
  } finally {
    content.value = ''
  }
}

const editTodo = async (toDO) => {
  try {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tkn\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    const res = await axios.put(
      `https://todolist-api.hexschool.io/todos/${toDO.id}`,
      { content: toDO.content },
      {
        headers: {
          authorization: myCookie
        }
      }
    )
    console.log(res)
    toDoList.value.forEach((item, index) => {
      if (item.id === toDO.id) {
        toDoList.value[index].content = toDO.content
      }
    })
    alert('修改完成')
  } catch (err) {
    console.log(err.response.data.message)
  }
}

const deleteToDo = async (toDO) => {
  try {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tkn\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    const res = await axios.delete(`https://todolist-api.hexschool.io/todos/${toDO.id}`, {
      headers: {
        authorization: myCookie
      }
    })
    console.log(res)
    toDoList.value.forEach((item, index) => {
      if (item.id === toDO.id) {
        toDoList.value.splice(index, 1)
      }
    })
  } catch (err) {
    console.log(err.response.data.message)
  }
}

const toggleToDo = async (toDO) => {
  try {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)tkn\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    const res = await axios.patch(
      `https://todolist-api.hexschool.io/todos/${toDO.id}/toggle`,
      {},
      {
        headers: {
          authorization: myCookie
        }
      }
    )
    toDoList.value.forEach((item, index) => {
      if (item.id === toDO.id) {
        toDoList.value[index].status = !toDO.status
      }
    })
  } catch (err) {
    console.log(err.response.data.message)
  }
}
const customReload = () => {
  location.reload()
}
</script>

<template>
  <section class="vh-100" v-if="showLogin">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://images.unsplash.com/photo-1481026469463-66327c86e544?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVpbGRpbmd8ZW58MHx8MHx8fDA%3D"
                  alt="login form"
                  class="img-fluid"
                  style="
                    border-radius: 1rem 0 0 1rem;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                  "
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form>
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219"></i>
                      <span class="h1 fw-bold mb-0">To-Do List</span>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
                      Sign into your account
                    </h5>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input
                        v-model="user.email"
                        type="email"
                        id="form2Example17"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="form2Example17">Email address</label>
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <input
                        v-model="user.password"
                        type="password"
                        id="form2Example27"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="form2Example27">Password</label>
                    </div>

                    <div class="pt-1 mb-4">
                      <button
                        data-mdb-button-init
                        data-mdb-ripple-init
                        class="btn btn-dark btn-lg btn-block"
                        type="button"
                        @click="login"
                      >
                        Login
                      </button>
                      <p class="customErrMsg">{{ loginErrMsg }}</p>
                    </div>

                    <p class="mb-5 pb-lg-2" style="color: #393f81">
                      Don't have an account?
                      <a style="color: #393f81" @click="showModal = true">Register here</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div
    v-if="showModal"
    class="modal fade show d-block"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Sign Up</h5>
          <button
            type="button"
            class="btn-close"
            @click="showModal = false"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="col-sm-2 col-form-label">email:</label>
            <input type="email" v-model="newUser.email" />
          </div>
          <div class="mb-3">
            <label class="col-sm-2 col-form-label">password:</label>
            <input type="password" v-model="newUser.password" />
          </div>
          <div class="mb-3">
            <label class="col-sm-2 col-form-label">nickname:</label>
            <input type="text" v-model="newUser.nickname" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">關閉</button>
          <button type="button" class="btn btn-primary" @click="signUp">確定</button>
          <p class="customErrMsg">{{ signUpErrMsg }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showTodo">
    <div class="dropdown text-end mb-3">
      <a
        href="#"
        class="d-block link-dark text-decoration-none dropdown-toggle"
        id="dropdownUser1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://github.com/mdo.png"
          alt="mdo"
          width="32"
          height="32"
          class="rounded-circle"
        />
      </a>
      <ul class="dropdown-menu dropdown-menu-end text-small" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#" @click="signOut">Sign out</a></li>
      </ul>
    </div>

    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 15px">
            <div v-if="showEdit === false">
              <button type="button" class="btn btn-outline-secondary m-3" @click="showEdit = true">
                >> Go to Edit mode
              </button>
            </div>
            <div v-else>
              <button type="button" class="btn btn-outline-secondary m-3" @click="customReload">
                >> Back to View mode
              </button>
            </div>
            <div class="card-body p-5">
              <h4 class="mb-3">To-do List</h4>

              <form class="d-flex justify-content-center mb-4">
                <div class="flex-fill">
                  <input
                    type="text"
                    id="form3"
                    class="form-control form-control-lg"
                    placeholder="What do you need to do today?"
                    v-model="content"
                  />
                </div>
                <button type="button" class="btn btn-warning btn-lg ms-2" @click="insertTodo">
                  Add
                </button>
              </form>

              <ul class="list-group mb-0">
                <li
                  v-for="toDO in toDoList"
                  :key="toDO.id"
                  class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
                >
                  <div class="d-flex align-items-center">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      aria-label="..."
                      :checked="toDO.status"
                      @change="toggleToDo(toDO)"
                    />
                    <div v-if="toDO.status">
                      <s> {{ toDO.content }}</s>
                    </div>
                    <div v-else-if="showEdit === true">
                      <input type="text" class="form-control" v-model="toDO.content" />
                    </div>
                    <div v-else>
                      {{ toDO.content }}
                    </div>
                  </div>
                  <div v-if="showEdit === true">
                    <div v-if="!toDO.status">
                      <button @click="editTodo(toDO)" type="button" class="btn btn-outline-warning">
                        edit
                      </button>
                    </div>
                    <button @click="deleteToDo(toDO)" type="button" class="btn btn-outline-danger">
                      delete
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customErrMsg {
  color: crimson;
}
</style>
