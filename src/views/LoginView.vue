<template>
  <div class="login"> 
    
    <vue-particles
            id="tsparticles"
            :particlesLoaded="particlesLoaded"
            :options="options"
        />
  <div class="container">
    <div class="row justify-content-center">
      <h1 class=" mt-5 mb-5 font-weight-normal text-center">請先登入</h1>
      <div class="col-4 logo">
         <img src="../../public/logoSm.png" alt="">         
      </div> 
      <div class="col-6">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              v-model="user.username"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating mb-2">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="user.password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-5" type="submit">
            登入
          </button>
        </form>
      </div>

    </div>   


  </div>
</div> 
</template>

<script>
import axios from 'axios';


const { VITE_URL } = import.meta.env;

export default {
  components:{
  
  },
  data() {
    return {
      user: {
        username: 'taniya.hsu@gmail.com',
        password: '123456789'
      },
      particlesLoaded: async (container) => {
        console.log('particles contaainer loaded', container)
      },
      options:{
        
                    background: {
                        color: {
                            value: '#fffff'
                        }
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: 'push'
                            },
                            onHover: {
                                enable: true,
                                mode: 'repulse'
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40
                            },
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: '#c7713bff'
                        },
                        links: {
                            color: '#c7713bff',
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: 'bounce',
                            random: false,
                            speed: 3,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 40
                        },
                        opacity: {
                            value: 0.8
                        },
                        shape: {
                            type: 'circle'
                        },
                        size: {
                            value: { min: 1, max: 5 }
                        }
                    },
                    detectRetina: true
                
      }
    };
  },
  mounted() {},
  methods: {
    login() {
      // const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      const api = `${VITE_URL}/admin/signin`;

      axios
        .post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexschoolToken=${token}; expires=${new Date(expired)}`;

          // 進後台
          // this.$router.push('/admin/adminHome');
          this.$router.push('/admin/adminProducts');
         
        })
        .catch((error) => {
          console.log('login error', error);
          alert('登入失敗');
        });
    }
  }
};
</script>
<style lang="scss">
.login{
  height: 100vh;
  padding-top: 100px;  
  background:url(../../public/ImgBgM.png);
  background-size: 100% 100%;
  .logo{
    width: 300px;
    margin-right: 20px;
    img{
      width: 100%;
    }
  }
  
  h1{
    font-size: 40px;
    font-weight: 600;
  }
  
  
}
</style>
