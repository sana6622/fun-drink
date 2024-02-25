<template>
  <div id="FrontView">
    <nav class="navbar navbar-expand-md">
      <div class="container-fluid">
        <RouterLink to="/">      
        <div class="logo">
          <img src="../../../public/logoBig.png" alt="logo" class="d-none d-sm-block" />
          <img src="../../../public/logoSm.png" alt="logo-sm" class="d-block d-sm-none" />
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
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/products">產品介紹</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/DIYdrink">DIY調飲室</RouterLink>
            </li>
            <li class="nav-item d-none d-md-block">
              <RouterLink to="/cart">
                <RiShoppingCart2Line size="24px" color="white" className="cart-icon" />
              </RouterLink>
            </li>
            <li class="nav-item d-md-none">
              <RouterLink to="/cart">購物車 </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- <nav>   
    <RouterLink to="/products">產品列表</RouterLink> | <RouterLink to="/cart">購物車</RouterLink> |
    <RouterLink to="/login">登入</RouterLink> |
    <RouterLink to="/admin/adminHome">進入後台首頁</RouterLink>
  </nav> -->
    <router-view></router-view>   
  </div>
</template>

<script>
import { RiHeartFill } from '@remixicon/vue'
import { RiShoppingCart2Line } from '@remixicon/vue'
export default {
  components: {
    // HelloWorld
    RiHeartFill,
    RiShoppingCart2Line
  }
}
</script>

<style  lang="scss">
@import '../../assets/reset.scss';

#FrontView {
  width: 100%;  
  .navbar { 
    width: 100%;
    position: fixed;
    padding: 0;
    background-color: #fee69c;
    padding: 12px 120px;
    ul {
      margin-left: auto;
      display: flex;
      align-items: center;
      li {
        font-size: 24px;
        font-weight: 600;
        margin-right: 25px;
      }
      :nth-child(3) {
        margin-right: 0;
        background-color: #e94709;
        padding: 2px 8px 8px 8px;
        border-radius: 5px;
      }
    }
    .logo {
      width: 300px;

      img {
        width: 80%;
      }
    }
  }

  @media screen and (max-width: 992px) {
    .navbar {
      padding: 10px 20px;
    }
  }

  @media screen and (max-width: 768px) {
    .navbar {
      ul {
        display: block;

        li {
          margin-top: 20px;
          text-align: center;
        }
      }
    }
  }
  @media screen and (max-width: 576px) {
    .navbar{
      .logo {
      width: 80px;

      img {
        width: 100%;
      }
    }
    }

  }
}
</style>