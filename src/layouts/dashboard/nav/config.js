import SvgColor from '../../../components/svg-color';
import {AiOutlineHome} from 'react-icons/ai'
 import {AiOutlineWifi} from 'react-icons/ai'
 import {AiOutlineBulb} from 'react-icons/ai'
 import {CgToolbox} from 'react-icons/cg'
 import {FiSettings} from 'react-icons/fi' 
 import {AiOutlineInbox} from 'react-icons/ai'
 import {IoIosPerson} from 'react-icons/io'

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home',
    icon:<AiOutlineHome/>
    // icon: icon('ic_analytics'),
  },
  {
    title: 'Contractors',
    path: '/dashboard/contractor-list',
    icon:<IoIosPerson/>,
    // icon: icon('ic_analytics'),
  },
  {
    title: 'Admin Feed',
    path: '/dashboard/feed',
    icon:<AiOutlineInbox/>
    
},
  {
    title: 'incubator',
    path: '/dashboard/categories-videos',
    icon:<AiOutlineBulb/>,
    
   /* children: [
      {
        title: 'videos',
        type: 'item',
         icon: 'Savings',
        path: '/dashboard/video',
      },
      {
        title: 'docs',
        type: 'item',
         icon: 'LockIcon',
         path: '/dashboard/docs',
      },
    ],*/
  },
  {/*
    title: `bids`,
    path: '/dashboard/chat',
    icon: icon('ic_msg'),
    iconLabel: 'msg',
    icon:<CgToolbox/>
*/},
  {/*
    title: 'settings',
     path: '#',
   iconLabel: 'settings',
   icon:<FiSettings/>
*/},
];

export default navConfig;
