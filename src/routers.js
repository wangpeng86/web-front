import UserList from './views/UserList.vue';
import RoleList from './views/RoleList.vue';

const routers = [
    {path: '/userList', component: UserList},
    {path: '/roleList', component: RoleList},
]

export default routers;