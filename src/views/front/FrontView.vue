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
              <RouterLink to="/DIYdrink">DIY 調飲室</RouterLink>
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
      <div class="footer-background"></div>
      <div class="footer-content section-container">
        <div class="footer-area">
          <div class="area-info">
            <ul>
              <li><span>營業時間</span> <span>09:00 -20:00</span></li>
              <li><span>地</span><span>址</span> <span>台北市米花區五丁路39號1樓</span></li>
              <li><span>聯絡我們</span> <span>(99)9999-9999</span></li>
            </ul>
            <div class="icon">
              <RiFacebookCircleFill size="24px" color="black" className="facebook-icon" />
              <RiInstagramLine size="24px" className="ig-icon" />
            </div>
          </div>
          <div class="area-img">
            <img src="../../../public/logoSm.png" alt="logo" />
          </div>
          <ul class="area-meun">
            <li>產品介紹</li>
            <li>DIY調飲室</li>
            <li>常見問題</li>
            <li><RouterLink to="/login">後台登入</RouterLink></li>
          </ul>
        </div>
        <div class="footer-copyright">
          <p>© Tania 2024</p>
        </div>
      </div>
    </div>

    <!--end of footer-->
  </div>
</template>

<script>
import { RiFacebookCircleFill, RiHeartFill, RiInstagramLine } from '@remixicon/vue'
import { RiShoppingCart2Line } from '@remixicon/vue'
export default {
  components: {
    RiHeartFill,
    RiShoppingCart2Line,
    RiFacebookCircleFill,
    RiInstagramLine
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
    position: relative;
    font-weight: 500;
    line-height: 25px;

    //將背景從獨立出來 (因為z-index = -1)
    .footer-background {
      background: url(../../../public/ImgBg.png);
      background-size: 100% 100%;
      z-index: -1;
      position: relative;
      height: 500px;
      z-index: -1;
      margin-top: -150px;
      padding-top: 200px;
    }
    .footer-content {
      z-index: 1;
      position: absolute;
      top: 200px;      
      width: 100%;
    }

    .footer-area {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      margin-top: 50px;
      margin-bottom: 50px;

      .area-info {
        ul {
          margin-bottom: 10px;
          li {
            margin-bottom: 8px;
          }
          li:nth-child(odd) {
            :nth-child(1) {
              padding-right: 8px;
            }
          }
          li:nth-child(2) {
            :nth-child(1) {
              margin-right: 30px;
            }
            :nth-child(2) {
              margin-right: 8px;
            }
          }
        }
        .facebook-icon {
          margin-right: 20px;
        }
      }

      .area-img {
        width: 160px;
        margin-bottom: 30px;
        text-align: center;
        position: absolute;
        top: -100px;
        left: 48%;
        img {
          width: 100%;
        }
        :hover {
          width: 200px;
        }
      }

      .area-meun {
        line-height: 40px;
        li {
          a {
            width: 100%;
          }
        }
        a:hover {
          color: #e94709;
        }
      }
    }
    .footer-copyright {
      text-align: center;
      color: gray;
      font-size: 12px;
    }

    @media screen and (max-width: 575px) {
      .footer-background {
      background: url(../../../public/ImgBgM.png);
      height: 750px;
      }

      .footer-area {
        flex-direction: column-reverse;
        justify-self: start;
        align-items: start;
        padding-top: 0;
        margin-top: 0;       
        .area-meun {
          margin-bottom: 20px;
        }
        .area-img {
          position: relative;
          top: 0;
          left: 0;
          width: 125px;
        }
        .area-info {
          .icon {
            margin-top: 20px;
          }
          .facebook-icon {
            margin-right: 20px;
          }
        }
      }
    }
  }
  .section-container {
    padding-right: 200px;
    padding-left: 200px;

    @media screen and (max-width: 1200px) {
      padding-right: 120px;
      padding-left: 120px;
    }

    @media screen and (max-width: 575px) {
      padding-right: 20px;
      padding-left: 20px;
    }
  }
}
</style>