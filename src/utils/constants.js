import IconMenuUser from 'components/Icons/IconMenuUser'
import IconMenuQuality from 'components/Icons/IconMenuQuality'
import IconMenuWithdrawal from 'components/Icons/IconMenuWithdrawal'
import IconMenuLogout from 'components/Icons/IconMenuLogout'
import IconMenuStatistics from 'components/Icons/IconMenuStatistics'

const LIST_MENU_SIDE_BAR = [
    { 
        key: 'statistics',
        path: "Statistics",
        label: 'Site 1',
        icon: <IconMenuStatistics />
    },
    { 
        key: 'user',
        path: "/user",
        label: 'Site 2',
        icon: <IconMenuUser />
    },
    { 
        key: 'kyc',
        path: "/kyc",
        label: 'Site 3',
        icon: <IconMenuQuality />
    },
    { 
        key: 'withdraw',
        path: "/withdraw",
        label: 'Site 4',
        icon: <IconMenuWithdrawal />
    },
    { 
        key: 'withdraws',
        path: "/withdraw",
        label: 'Site 5',
        icon: <IconMenuWithdrawal />
    },
    { 
        key: 'logout',
        path: "/logout",
        label: 'Logout',
        icon: <IconMenuLogout />
    },
  
];

export {LIST_MENU_SIDE_BAR}