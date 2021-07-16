'use strict'
import dva from 'dva'

import createLoading from 'dva-loading'
import { Router, Switch, Route } from 'dva/router'
import dynamic from 'dva/dynamic'
import IndexPage from './routes/IndexPage';
import IndexModel from './models/example'

const app = dva({  // 初始化app
    onError(e) {
      // Feedback.toast.error(e.message)
      console.log(e.message)
    }
})

app.use(createLoading()) //
app.router(({ history, app }) => {
    const ListPage  = dynamic({
        app,                      // 那个实例
        component: () => IndexPage,  // React Component
        models: () => [IndexModel]   // React 数据
    })

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={ListPage} />
        </Switch>
      </Router>

    )
})
app.start('#root')

