<template>
  <div id="FrontView">
    <nav class="navbar navbar-expand-md">
      <div class="container-fluid">
        <RouterLink to="/">
          <div class="logo">
            <img src="../../../public/logoBig.png" alt="logo" />
            <!-- <img src="../../../public/logoSm.png" alt="logo-sm" class="d-block d-sm-none" /> -->
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
    <div class="footer">
      <div>footerffooterfootefooterfooteooter</div>
    </div>
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
  font-family: 'Noto Sans TC', sans-serif;
  .navbar {
    width: 100%;
    position: fixed;
    padding: 0;
    background-color: #fee69c;
    padding: 12px 120px;
    z-index: 99;
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

  .footer {
    position: relative;
    height: 500px;
    background: url(../../../public/ImgBg.png);
    background-size: 100% 100%;
    z-index: -1;
    margin-top: -150px;
    padding-top: 150px;
  }

  @media screen and (max-width: 992px) {
    .navbar {
      padding: 10px 20px;
    }
  }

  @media screen and (max-width: 767px) {
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
  @media screen and (max-width: 575px) {
    .navbar {
      .logo {
        width: 250px;

        img {
          width: 80%;
        }
      }
    }
  }
  @media screen and (max-width: 400px) {
    .navbar {
      .logo {
        width: 220px;
      }
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
</style>