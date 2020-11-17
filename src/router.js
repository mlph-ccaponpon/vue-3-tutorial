import { createRouter, createWebHistory} from 'vue-router';
import Home from './pages/Home';
import KoreanDrama from './pages/KoreanDrama';
import Calendar from './pages/Calendar';
import Markdown from './pages/Markdown';
import Slider from './pages/Slider';
import Calculator from './pages/Calculator';
import ReuseableModal from './pages/ReuseableModal';
import Chat from './pages/Chat';
import store from './store/index';

const routes = [
    {path: '/', component: Home},
    {path: '/korean-drama', component: KoreanDrama},
    {path: '/calendar', component: Calendar},
    {path: '/markdown', component: Markdown},
    {path: '/slider', component: Slider},
    {path: '/calculator', component: Calculator},
    {path: '/reuseable-modal', component: ReuseableModal},
    {path: '/chat', component: Chat, meta: { middleware: "auth"}},
]
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, _, next) => {
    if(to.meta.middleware) {
        const middleware = require(`./middleware/${to.meta.middleware}`);
        console.log(to.meta);
        if(middleware) {
            middleware.default(next, store);
        }
    } else {
        next();
    }
});

export default router;
