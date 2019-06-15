import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/page/login.vue'
import cIndex from '../components/page/cIndex.vue'
import Glygly from '../components/views/glygly.vue'
import Sbgly from '../components/views/sbgly.vue'
import Tzgly from '../components/views/tzgly.vue'
import Yhgly from '../components/views/yhgly.vue'
import Creat from '../components/views/creat.vue'
import Creat1 from '../components/views/creat1.vue'
import Creat2 from '../components/views/creat2.vue'
import Creat3 from '../components/views/creat3.vue'
import Equipment from '../components/views/equipment.vue'
import Inform from '../components/views/inform.vue'
import Manage from '../components/views/manage.vue'
import User from '../components/views/user.vue'
import Welcome from '../components/views/Welcome.vue'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/login',
        component: Login,
    }, {
        path: '/cIndex',
        component: cIndex,
        children: [{
                path: '',
                component: Welcome
            },
            {
                path: 'equipment',
                component: Equipment,
                children: [{
                    path: 'creat/:id',
                    component: Creat3,
                }, {
                    path: '',
                    component: Sbgly,
                }]
            }, {
                path: 'inform',
                component: Inform,
                children: [{
                    path: 'creat/:id',
                    component: Creat2,
                }, {
                    path: '',
                    component: Tzgly,
                }]
            }, {
                path: 'manage',
                component: Manage,
                children: [{
                    path: 'creat/:id',
                    component: Creat,
                }, {
                    path: '',
                    component: Glygly,
                }]

            }, {
                path: 'user',
                component: User,
                children: [{
                    path: 'creat/:id',
                    component: Creat1,
                }, {
                    path: '',
                    component: Yhgly,
                }]
            }, {
                path: '',
                redirect: 'manage'
            }
        ]
    }, {
        path: '*',
        redirect: '/login'
    }]
})