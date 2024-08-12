<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const user = ref({
  email: '123@gmail.com',
  password: '12345678'
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
const nickName = ref('')

const login = async () => {
  loginErrMsg.value = ''
  try {
    const res = await axios.post('https://todolist-api.hexschool.io/users/sign_in', user.value)
    showLogin.value = false
    showTodo.value = true
    console.log(res)
    document.cookie = `tkn=${res.data.token}; expires=${res.data.exp};path=/; `
    nickName.value = res.data.nickname
  } catch (err) {
    console.log(err.response.data.message)
    loginErrMsg.value = err.response.data.message
  }
}

const signUp = async () => {
  console.log(showModal.value)
  signUpErrMsg.value = ''
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
          <button type="button" class="btn btn-secondary" @click="showModal = false">關閉</button>
          <button type="button" class="btn btn-primary" @click="signUp">確定</button>
          <p>{{ signUpErrMsg }}</p>
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
        {{ nickName }}
      </a>
      <ul class="dropdown-menu dropdown-menu-end text-small" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#" @click="signOut">Sign out</a></li>
      </ul>
    </div>

    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 15px">
            <div class="card-body p-5">
              <h4 class="mb-3">To-do List</h4>

              <form class="d-flex justify-content-center mb-4">
                <div class="flex-fill">
                  <input
                    type="text"
                    id="form3"
                    class="form-control form-control-lg"
                    placeholder="What do you need to do today?"
                  />
                </div>
                <button type="submit" class="btn btn-warning btn-lg ms-2">Add</button>
              </form>

              <ul class="list-group mb-0">
                <li
                  class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
                >
                  <div class="d-flex align-items-center">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      aria-label="..."
                    />
                    Cras justo odio
                  </div>
                  <div>
                    <button type="button" class="btn btn-warning">edit</button>
                    <button type="button" class="btn btn-danger">remove</button>
                  </div>
                </li>

                <li
                  class="list-group-item d-flex d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
                >
                  <div class="d-flex align-items-center">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                      aria-label="..."
                      checked
                    />
                    <s>Dapibus ac facilisis in</s>
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
