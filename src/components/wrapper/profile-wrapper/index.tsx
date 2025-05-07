import { Outlet } from 'react-router-dom';
import useController from './libs/useController';
import Text from '@/components/text';

const ProfileWrapper = () => {
  const { profileMenu, profileActive, handleProfileActive } = useController();
  return (
    <div className="flex flex-row py-10 w-full border-2 rounded-lg border-border-primary bg-white min-h-screen">
      <div className="flex px-4 flex-col border-r border-border-secondary w-1/5">
        <div className="flex flex-col gap-4">
          {profileMenu.map(menu => (
            <div
              onClick={() => handleProfileActive(menu.label)}
              key={menu.path}
              className={`flex flex-row  gap-2 py-2 px-4 rounded-lg  ${
                menu.active
                  ? 'border border-border-secondary'
                  : 'cursor-pointer hover:bg-background-alt'
              }`}
            >
              <Text
                className={`${menu.active ? 'text-text-primary font-semibold' : 'text-text-gray'}`}
                label={menu.label}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex px-10 w-4/5">
        <div className="flex flex-col w-full gap-15">
          <Text label={profileActive || ''} variant="h1" />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
