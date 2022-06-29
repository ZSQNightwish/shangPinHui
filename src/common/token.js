/*
* 本地存储存储的token数据
*
* */
export const setTOKEN = (token) => {
  return localStorage.setItem('token',token)
}
// export const getTOKEN = () => {
//   return localStorage.getItem('token')
// }
export const removeTOKEN=()=>{
  localStorage.removeItem('token')
}
