# FaceBook ToDo-List Tutorial
To demonstrate the Flux architecture with some example code, let's take on the classic TodoMVC application. The entire application is available in the React GitHub repo within the flux-todomvc example directory, but let's walk through the development of it a step at a time.    
让我们用一个经典的“todo-list”应用来演示Flux体系，整个todo-list代码可以在github上得到，但现在让我们一步一步来开发。

To begin, we'll need some boilerplate and get up and running with a module system. Node's module system, based on CommonJS, will fit the bill very nicely and we can build off of react-boilerplate to get up and running quickly. Assuming you have npm installed, simply clone the react-boilerplate code from GitHub, and navigate into the resulting directory in Terminal (or whatever CLI application you like). Next run the npm scripts to get up and running: npm install, then npm run build, and lastly npm start to continuously build using Browserify.    
首先，我们要用一个模块系统来进行一些引用。Node是基于CommonJS节点的模块系统,将能很好地满足要求,我们可以快速的构建React引用并启动。我们假设你已经配置好了React的使用环境。
### Source Code Structure(代码结构)
The index.html file may be used as the entry point into our app which loads the resulting bundle.js file, but we'll put most of our code in a 'js' directory. Let's let Browserify do its thing, and now we'll open a new tab in Terminal (or a GUI file browser) to look at the directory. It should look something like this:  
用index.html文件作为我们的应用入口，当然他要加载bundle.js。我们将我们的代码存入js文件夹。同时用browserify生成打包这些文件。文件目录如下：

	myapp
	  |
	  + ...
	  + js
	    |
	    + actions
	    + components // all React components, both views and controller-views
	    + constants
	    + dispatcher
	    + stores
	    + app.js
	    + bundle.js
	  + index.html
	  + ...

### Creating a Dispatcher(创建调度程序)













