import {
  HomeIcon,
  UsersIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/solid';

export const sidebarItems = [
  { icon: <HomeIcon />, name: 'Home', path: '/home' },
  { icon: <UsersIcon />, name: 'Friends', path: '/friends' },
  { icon: <UserPlusIcon />, name: 'Friend requests', path: '/friend-requests' },
  { icon: <ChatBubbleLeftRightIcon />, name: 'Messages', path: '/messages' }
];
