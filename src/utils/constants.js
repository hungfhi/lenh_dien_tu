import {
    HomeOutlined,
    MacCommandOutlined,
    FormOutlined,
    AppstoreOutlined,
    PieChartOutlined,
    SettingOutlined
} from '@ant-design/icons';


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const LIST_MENU_SIDE_BAR = [
  getItem('Trang chủ', 'home', <HomeOutlined />),
  getItem('Lệnh điện tử', 'command',<MacCommandOutlined />, [
        getItem('Lệnh 1', 'command'),
  ]),

   getItem('Kế hoạch', 'plan', <FormOutlined />, [
    getItem('Option 9', 'plan1'),
    getItem('Option 10', 'plan2'),
    getItem('Option 11', 'plan3'),
    getItem('Option 12', 'plan4'),
  ]),
   getItem('Danh mục', 'category', <AppstoreOutlined />, [
    getItem('Quản lý tài khoản', 'cate1'),
    getItem('Quản lý bến xe', 'cate2'),
    getItem('Quản lý phương tiện', 'cate3'),
    getItem('Quản lý tuyến', 'cate4'),
    getItem('Quản lý đơn vị vận tải', 'cate5'),
  ]),
   getItem('Báo cáo', 'report', <PieChartOutlined />),
   getItem('Quản trị', 'admin', <SettingOutlined />)
];


export {LIST_MENU_SIDE_BAR}