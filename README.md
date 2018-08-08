一: 项目介绍
  具有博客系统, 包含登录、注册、文章发布、文章管理、文章显示等功能

二: 文件介绍
* apis

  | 文件                 | 作用                                    |
  | ------------------ | :--------------------------------------- |
  | connectMongo.js    | 连接MongoDB数据库|
  | formate.js         | 将Mongo的查询结果转为适合Hbs渲染的格式      |
  | generateCaptcha.js | 产生验证码                                    |
  | judgeRegist.js     | 判断注册时输入的信息是否符合标准以及是否已存在                  |
  | judgeSignin.js     | 判断登录信息                                   |
  | useCrypto.js       | 密码加密和密码验证                                |

* bin

  | 文件   | 作用   |
  | ---- | :--- |
  | www  | 启动项目 |

* public

  --public
    --外层: 登录注册的JS, CSS
    --内层user: 登录后的JS, CSS

  | 文件          | 作用               |
  | ----------- | :--------------- |
  | images      | 存放前端图片           |
  | javascripts | 存放前端javascript文件 |
  | stylesheets | 存放前端css文件        |

* models(MVC模型中的M)
  | 文件              | 作用                                |
  | --------------- | --------------------------------- |
  | articleStore.js | 生成关于Article的Model, Schema, 以及相关函数 |
  | collectStore.js | 生成关于Collect的Model, Schema, 以及相关函数 |
  | draftStore.js   | 生成关于Draft的Model, Schema, 以及相关函数   |
  | userAndArticle.js | 生成关于userAndArticle的Model, Schema, 以及相关函数 |
  | userStore.js    | 生成关于User的Model, Schema, 以及相关函数    |
  

* views(MVC模型中的V)

  | 文件         | 作用        |
  | ---------- | :-------- |
  | regist.hbs | 注册界面的渲染模板 |
  | signin.hbs | 登录界面的渲染模板 |
  | error.hbs  | 错误路径的渲染模板 |

     --user
  | 文件          | 作用          |
  | ----------- | :---------- |
  | draftAndCollect.hbs | 草稿和收藏管理界面的渲染模板 |
  | home.hbs    | 用户主界面的渲染模板  |
  | article.hbs | 具体博客页面的渲染模板 |
  | manage.hbs  | 博客管理界面的渲染模板 |
  | write.hbs   | 博客发布界面的渲染模板 |

* routes(MVC模型中的C): 路由层

* app.js: 中间件文件

三. 项目依赖
  前端样式采用Bootstrap框架以及手写样式, 模板引擎采用Hbs, 后端采用Express框架, 数据库采用MongoDb

四. 项目配置
  npm install

五. 访问
```
npm start启动服务器监听8000端口
localhost:8000/signin为登录页面
```





