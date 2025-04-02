import { DashboardOutlined, GroupOutlined , HomeOutlined} from '@ant-design/icons';
import { APP_PREFIX_PATH, ROOMSCATEGORIES, ROOMS } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboards`,
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'rooms',
      path: `${ROOMS}`,
      title: 'sidenav.dashboard.rooms',
      icon: HomeOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'room-categories',
      path: `${ROOMSCATEGORIES}`,
      title: 'sidenav.dashboard.rooms_categories',
      icon: GroupOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
