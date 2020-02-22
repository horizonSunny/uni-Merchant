import http from "@/config/axios";
// 获取药品分类信息
async function getClassify() {
  console.log("in getClassify");
  return http.get("/admin/v1/category/getCategorys?status=");
}

export { getClassify };
