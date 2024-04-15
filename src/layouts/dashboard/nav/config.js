import SvgColor from '../../../components/svg-color';
import {AiOutlineHome} from 'react-icons/ai'
 import {AiOutlineWifi} from 'react-icons/ai'
 import {AiOutlineBulb} from 'react-icons/ai'
 import {CgToolbox} from 'react-icons/cg'
 import {FiSettings} from 'react-icons/fi' 
 import {AiOutlineInbox} from 'react-icons/ai'
 import {IoIosPerson} from 'react-icons/io'
 import {FaChalkboardTeacher} from 'react-icons/fa'
 import { FaComments } from "react-icons/fa";

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'DASHBOARD',
    path: '/dashboard/home',
    icon:<AiOutlineHome/>
    // icon: icon('ic_analytics'),
  },
  {
    title: `STUDENTS`,
    path: '/dashboard/student-list',
    icon:<IoIosPerson/>,
    // icon: icon('ic_analytics'),
  },
  {
    title: `TEACHERS`,
    path: '/dashboard/teacher-list',
    icon:<FaChalkboardTeacher/>,
    // icon: icon('ic_analytics'),
  },
  {
    title: 'FEED',
   // path: '/dashboard/feed',
    icon:<AiOutlineInbox/>
    
},
  {
    title: 'COURSES',
    path: '/dashboard/courses',
    icon:<AiOutlineBulb/>,
  },
  {
    title: 'ORDERS',
   path: '/dashboard/orders',
    icon:<AiOutlineInbox/>
    
},

{
  title: 'BLOG',
 path: '/dashboard/blog',
  icon:<FaComments/>
  
},
];

export default navConfig;
