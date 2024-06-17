
const fetchClient = require('node-fetch');

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { question } = event;
  const wxContext = cloud.getWXContext();
  const result = await db.collection('config').where({
    name: 'volc'
  }).get();
  const config = result.data[0];
    const res = await fetchClient("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
      method: 'post',
      headers: {
        "Authorization": "Bearer " + config.token
      },
      body: JSON.stringify({
        "model": "ep-20240615044418-lmzkv",
        "messages": [
          {
            "role": "system",
            "content": "You are a helpful assistant."
          },
          {
            "role": "user",
            "content": question
          }
        ],
        "stream": false
      })
    })
  const data = await res.json();
  return data.choices[0].message.content
}