const URL = "https://web-api.juejin.im/query";
const request = require("request");
const mysql = require("../db/mysql");
const fs = require("fs");

let count = 0;

/**
 *
 * @param {*} id   如果中途数据断了 可以 getList(id) 这个id 就是在 /id 这个文件中 存储的上一次的id  可自行修改
 */
function getList(id = "") {
  request.post(
    {
      url: URL,
      json: {
        operationName: "",
        query: "",
        // after: id 具有 分页的效果
        variables: { first: 20, after: id || "", order: "POPULAR" },
        extensions: { query: { id: "21207e9ddb1de777adeaca7a2fb38030" } }
      },
      headers: {
        "Content-Type": "application/json",
        "X-Agent": "Juejin/Web", // 一定要带上这个头  不然掘进服务器会被拦截
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36"
      }
    },
    function(err, res, body) {
      if (err) {
        return new Error(err);
      }

      if (body.data) {
        const {
          edges,
          pageInfo: { hasNextPage, endCursor }
        } = body.data.articleFeed.items;
        edges.forEach(v => {
          mysql.query(`select * from list where id=?`, [v.node.id], function(
            error,
            results,
            fields
          ) {
            if (error) throw error;
            // console.log("The solution is: ", results);
            if (results.length === 0) {
              setData(v.node);
            }
          });
        });

        // 有下一页
        if (hasNextPage) {
          // 这里只是把 记录一下上一次的id  方便调试
          fs.writeFileSync("./id", endCursor);
          setTimeout(v => {
            getList(endCursor);
          }, 1000); // 想快一点 数值是可以改的  建议不要太小  防止掘进检测
        } else {
          console.log("finish  success");
          process.exit(0);
        }
      }
    }
  );
}
// 1.6185456546263481e-08
// getList("0.000349183218170109996");
// getList("1.6185456546263481e-08");
// getList("8.91285964257780058e-08");

getList();
// 1.6185456546263481e-08
function setData(v) {
  const columns = [
    "id",
    "commentsCount",
    "originalUrl",
    "content",
    "category",
    "tags",
    "title",
    "user",
    "lastCommentTime",
    "likeCount",
    "createdAt",
    "updatedAt"
  ];
  console.log(v.title);

  const columnsVal = [
    v.id,
    v.commentsCount,
    v.originalUrl,
    v.content,
    JSON.stringify(v.category) || "",
    JSON.stringify(v.tags) || "",
    v.title || "",
    JSON.stringify(v.user) || "",
    v.lastCommentTime,
    v.likeCount,
    v.createdAt,
    v.updatedAt
  ];
  try {
    mysql.query(
      `INSERT INTO list (??) VALUES (?)`,
      [columns, columnsVal],
      function(error, results, fields) {
        if (error) throw error;
        count++;
        console.log(`添加了一条数据: ${count}`);
        // console.log("The solution is: ", results);
      }
    );
  } catch {
    console.log("这条数据有问题", JSON.stringify(columnsVal));
  }
}
