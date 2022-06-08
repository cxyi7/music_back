// 获取token值
const SQL = {
  query: 'select u_id,u_name,u_password from ad_user where u_name = (?);'
};

module.exports = SQL;