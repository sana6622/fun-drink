<template>    
  
      <div class="footer section-container">
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
            <li><RouterLink to="/login">登入</RouterLink></li>
          </ul> 
  
        </div>
        <div class="footer-copyright">
          <p>© Tania 2024</p>
        </div>
      </div>
  
  
  
  
  
  </template>
  
  <script>
  import { RiFacebookCircleFill,  RiInstagramLine } from '@remixicon/vue'

  export default {
    components: { 
      RiFacebookCircleFill,
      RiInstagramLine
    }
  }
  </script>
  
  <style  lang="scss">
  @import '../../assets/reset.scss';
  

  
    .footer {
      position: relative;
      background: url(../../../public/ImgBg.png);
      background-size: 100% 100%;
      z-index: -1; 
      margin-top: -150px;
      padding-top: 200px;
      padding-bottom: 20px;
      font-size: 16px;
      font-weight: 500;
      line-height: 25px;  
  
     
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
            li:nth-child(odd){             
               :nth-child(1){    
                padding-right: 8px;
               }              
              }
              li:nth-child(2){                        
               :nth-child(1){             
                margin-right: 30px;             
               }
               :nth-child(2){             
                margin-right: 8px;             
               }              
              }          
          }
          .facebook-icon{
              margin-right: 20px;
            }       
        }
  
        .area-img {      
            width: 160px;
            margin-bottom: 30px;         
            text-align: center;
            position: absolute;
            top: -100px;
            left:48%;
            img {
              width: 100%;
            }
          }      
  
        .area-meun{   
          line-height: 30px;
          outline:1px solid red;     
        }
      }
      .footer-copyright {
        text-align: center;
        color: gray;    
        font-size: 12px;  
      }
  
      @media screen and (max-width: 575px) {
        background: url(../../../public/ImgBgM.png);     
        
        .footer-area{
          flex-direction: column-reverse;
          justify-self: start;
          align-items: start;
          padding-top: 0;
          margin-top: 0;
          .area-meun{
            margin-bottom: 20px;
          }
          .area-img{          
            position: relative;        
            top: 0;
            left: 0;
            width: 125px;
          }
          .area-info{
           .icon{
            margin-top: 20px;
           }
            .facebook-icon{
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
  
  </style>