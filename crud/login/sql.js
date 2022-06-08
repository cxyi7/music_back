// 用户登录信息查询
const SQL = {
  query: `select u.u_name,u.u_status,r.r_status,r.r_power from ad_user as u right join ad_roles as r on u.r_name = r.r_name where u.u_id = (?);`
};

module.exports = SQL;