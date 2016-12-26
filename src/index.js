import './index.html';
import './index.css';
import dva from 'dva';
// import './components/DropBar/drop.css';
// 1. Initialize
//const app = dva();
const app = dva({});

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/login'));
app.model(require('./models/main'));
app.model(require('./models/attrlist'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
