// 日付をYYYY-MM-DDの書式で返す
export const formatDate = (dt: Date) => {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' +  d);
}