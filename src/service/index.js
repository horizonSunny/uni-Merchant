import http from "@/config/axios";
// 获取药品分类信息
function getClassify() {
  return http.get("admin/v1/category/getCategorys?status=2");
}

export { getClassify };
