<template>
  <div id="AdminView">
    <h2>這是後台</h2>
    <nav>
      <RouterLink to="/admin/adminHome">後台首頁</RouterLink> |
      <RouterLink to="/admin/adminProducts">後台產品列表</RouterLink> |
      <RouterLink to="/admin/adminOrder">後台訂單列表</RouterLink> |
      <RouterLink to="/">回到前台</RouterLink>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
console.log(import.meta.env);
const { VITE_URL } = import.meta.env;

export default {
  mounted() {
    // 取得token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },

  methods: {
    checkAdmin() {
      const checkApi = `${VITE_URL}/api/user/check`;
      axios
        .post(checkApi)
        .then((res) => {
          console.log('驗證成功', res.data.success);
        })
        .catch((e) => {
          console.log('error', e);
          alert('尚未登入');
          this.$router.push('/login');
        });
    }
  }
};
</script>
<style  lang="scss">
@import '../../assets/reset.scss';

#AdminView {
  width: 100%; 
  font-family: 'Noto Sans TC', sans-serif;   
  
}
</style>
