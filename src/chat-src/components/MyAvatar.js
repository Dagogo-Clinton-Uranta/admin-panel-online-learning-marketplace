// hooks
// utils
import { useSelector } from 'react-redux';
import createAvatar from '../utils/createAvatar';
import ProfileImg from '../../assets/images/author.png'
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <Avatar
      src={ProfileImg}
      alt={'user?.displayName'}
      color={ProfileImg ? 'default' : createAvatar('user?.displayName').color}
      {...other}
    >
      {createAvatar('user?.displayName').name}
    </Avatar>
  );
}
