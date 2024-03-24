<template>
  <div id="AdminView">
    <nav class="navbar navbar-expand-md">
      <div class="container-fluid">
        <RouterLink to="/">
          <div class="logo">
            <img src="../../../public/logoBig.png" alt="logo" />
          
          </div>
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="clickNavBtn"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" ref="navRef" id="navbarNav">
          <ul class="navbar-nav">
            <!-- <li class="nav-item">
              <RouterLink to="/admin/adminHome">後台首頁</RouterLink>
            </li> -->
            <li class="nav-item">
              <RouterLink to="/admin/adminProducts">產品列表</RouterLink> 
            </li>
            <li class="nav-item">
              <RouterLink to="/admin/adminOrder">訂單列表</RouterLink> 
            </li>
            <li class="nav-item ">
              <RouterLink to="/">回到前台</RouterLink>
            </li>            
          </ul>
        </div>
      </div>
    </nav>


    <router-view></router-view>

    <div class="footer">
      <div class="footer-content">
        <div class="area-img">
          <img src="../../../public/logoSm.png" alt="logo" />
        </div>
        <div class="footer-copyright">
          <p>© Tania 2024</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
console.log(import.meta.env)
const { VITE_URL } = import.meta.env

export default {
  mounted() {
    // 取得token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    axios.defaults.headers.common.Authorization = token
    this.checkAdmin()
  },

  methods: {
    checkAdmin() {
      const checkApi = `${VITE_URL}/api/user/check`
      axios
        .post(checkApi)
        .then((res) => {
          console.log('驗證成功', res.data.success)
        })
        .catch((e) => {
          console.log('error', e)
          alert('尚未登入')
          this.$router.push('/login')
        })
    },

    //突然出現navbar無法收闔下拉區塊問題，可能是bootstarp更版造成，暫時使用這個方式處理
    clickNavBtn(){  
      console.log('111')      
      if(this.$refs.navRef.classList.contains('d-none')){
        this.$refs.navRef.classList.remove('d-none')
      }else{
        this.$refs.navRef.classList.add('d-none')
      }     
    }
  }
}
</script>
<style  lang="scss">
@import '../../assets/reset.scss';

#AdminView {
  width: 100%;
  font-family: 'Noto Sans TC', sans-serif;
  .navbar {
    width: 100%;
    position: fixed;
    padding: 0;
    background-color: #fee69c;
    padding: 12px 120px;
    z-index: 99;    
    margin-top: 0;
    top: 0;
    ul {
      margin-left: auto;
      display: flex;
      align-items: center;
      li {
        font-size: 24px;
        font-weight: 600;
        margin-right: 25px;
      }
     
    }
    .logo {
      width: 300px;

      img {
        width: 80%;
      }
    }
    @media screen and (max-width: 992px) {
      padding: 10px 20px;
    }

    @media screen and (max-width: 767px) {
      ul {
        display: block;

        li {
          margin-top: 20px;
          text-align: center;
        }
      }
    }
    @media screen and (max-width: 575px) {
      .logo {
        width: 250px;

        img {
          width: 80%;
        }
      }
    }
    @media screen and (max-width: 400px) {
      .logo {
        width: 220px;
      }
    }

    @media screen and (max-width: 375px) {
      .navbar {
        .logo {
          width: 200px;
        }
      }
    }
  }

  .footer {
    font-weight: 500;
    line-height: 25px;
    background: url(../../../public/ImgBg.png);

    .footer-content {     
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items:center ;

      .area-img {
        width: 160px;
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: center;
       

        img {
          width: 100%;
        }
        :hover {
          width: 200px;
        }
      }
    }
    .footer-copyright {
      text-align: center;
      color: gray;
      font-size: 12px;
    }    
  }
}
</style>
